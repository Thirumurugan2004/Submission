using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models;
using BankCustomerAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI")]
    public class AuthController : ControllerBase
    {
        private readonly TrainingContext _context;
        private readonly ITokenService _tokenService;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly ILoginAttemptService _loginAttemptService;

        public AuthController(
            TrainingContext context,
            ITokenService tokenService,
            IRefreshTokenService refreshTokenService,
            ILoginAttemptService loginAttemptService)
        {
            _context = context;
            _tokenService = tokenService;
            _refreshTokenService = refreshTokenService;
            _loginAttemptService = loginAttemptService;
        }

        // =====================================================================
        // 🔐 PASSWORD HASH (SHA-256)
        // =====================================================================
        private string Hash(string password) =>
            Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(password)));

        // =====================================================================
        // 🔑 LOGIN
        // =====================================================================
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { message = "Username and password required." });

            var email = request.Username.Trim().ToLower();
            var hashed = Hash(request.Password);

            var user = await _context.Users
                .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Email == email);

            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();
            var ua = Request.Headers.UserAgent.ToString();

            if (user == null)
            {
                await _loginAttemptService.LogAttemptAsync(null, email, false, ip, ua);
                return Unauthorized(new { message = "Invalid username or password." });
            }

            if (user.PasswordHash != hashed)
            {
                await _loginAttemptService.LogAttemptAsync(user.UserId, email, false, ip, ua);
                return Unauthorized(new { message = "Invalid username or password." });
            }

            if (!user.IsActive)
                return Unauthorized(new { message = "User inactive." });

            // Log successful attempt
            await _loginAttemptService.LogAttemptAsync(user.UserId, email, true, ip, ua);

            // User roles
            var roles = user.UserRoles.Select(r => r.Role.RoleName).ToList();
            var primaryRole = roles.FirstOrDefault() ?? "User";

            // 🔥 NOW TOKEN INCLUDES userId CLAIM
            var accessToken = _tokenService.GenerateToken(user.Email, primaryRole, user.UserId);

            var refreshToken = await _refreshTokenService.CreateRefreshTokenAsync(user.UserId);

            // Write refresh token to HttpOnly cookie
            Response.Cookies.Append("refreshToken", refreshToken.Token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // true in production
                SameSite = SameSiteMode.Lax,
                Expires = refreshToken.ExpiresAt
            });

            return Ok(new
            {
                message = "Login successful",
                accessToken,
                user = new
                {
                    user.UserId,
                    user.FullName,
                    user.Email,
                    roles
                }
            });
        }

        // =====================================================================
        // 🔄 REFRESH TOKEN
        // =====================================================================
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request)
        {
            var incomingToken = request.RefreshToken ?? Request.Cookies["refreshToken"];

            if (incomingToken == null)
                return Unauthorized(new { message = "Refresh token missing." });

            var existing = await _refreshTokenService.GetByTokenAsync(incomingToken);

            if (existing == null || existing.Revoked || existing.ExpiresAt <= DateTime.UtcNow)
                return Unauthorized(new { message = "Invalid or expired refresh token." });

            var user = existing.User;

            // ROTATE TOKENS
            var newRt = await _refreshTokenService.CreateRefreshTokenAsync(user.UserId);
            await _refreshTokenService.RotateAsync(existing, newRt);

            // Get updated roles
            var roles = await _context.UserRoles
                .Where(r => r.UserId == user.UserId)
                .Select(r => r.Role.RoleName)
                .ToListAsync();

            var primaryRole = roles.FirstOrDefault() ?? "User";

            // issue new access token
            var accessToken = _tokenService.GenerateToken(user.Email, primaryRole, user.UserId);

            // Save new cookie
            Response.Cookies.Append("refreshToken", newRt.Token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = newRt.ExpiresAt
            });

            return Ok(new
            {
                accessToken,
                refreshToken = newRt.Token
            });
        }

        // =====================================================================
        // 🚪 LOGOUT
        // =====================================================================
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var token = Request.Cookies["refreshToken"];
            if (token != null)
            {
                var existing = await _refreshTokenService.GetByTokenAsync(token);
                if (existing != null)
                    await _refreshTokenService.RevokeAsync(existing);

                Response.Cookies.Delete("refreshToken");
            }

            return Ok(new { message = "Logged out." });
        }

        // =====================================================================
        // 🧾 REGISTER (User role assigned automatically)
        // =====================================================================
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.FullName) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { message = "Fill all required fields." });

            var email = request.Email.Trim().ToLower();

            if (await _context.Users.AnyAsync(u => u.Email == email))
                return Conflict(new { message = "Email already exists." });

            var hashed = Hash(request.Password);

            var user = new Entities.Training.User
            {
                FullName = request.FullName,
                Email = email,
                PasswordHash = hashed,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Assign default USER ROLE
            _context.UserRoles.Add(new Entities.Training.UserRole
            {
                UserId = user.UserId,
                RoleId = 2, // USER
                AssignedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration successful" });
        }
    }
}
