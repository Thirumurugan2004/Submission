using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models;
using BankCustomerAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Security.Claims;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI")]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly ILoginAttemptService _loginAttemptService;
        private readonly IAuditLogService _auditLogService;
        private readonly TrainingContext _context;

        public AuthController(
            ITokenService tokenService,
            IRefreshTokenService refreshTokenService,
            ILoginAttemptService loginAttemptService,
            IAuditLogService auditLogService,
            TrainingContext context
        )
        {
            _tokenService = tokenService;
            _refreshTokenService = refreshTokenService;
            _loginAttemptService = loginAttemptService;
            _auditLogService = auditLogService;
            _context = context;
        }

        private string Hash(string password) =>
            Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(password)));

        // ============================================================
        //                      LOGIN
        // ============================================================
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { message = "Username and password are required." });

            var email = request.Username.Trim().ToLower();
            var passwordHash = Hash(request.Password);

            var user = await _context.Users
                .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Email == email);

            var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            var userAgent = Request.Headers.UserAgent.ToString();

            // User not found
            if (user == null)
            {
                await _loginAttemptService.LogAttemptAsync(null, email, false, ip, userAgent);
                return Unauthorized(new { message = "Invalid username or password." });
            }

            // Check lockout (3 failed attempts within 5 minutes)
            var failedCount = await _loginAttemptService.CountRecentFailedAsync(user.UserId, TimeSpan.FromMinutes(5));
            if (failedCount >= 3)
            {
                return Unauthorized(new { message = "Account temporarily locked due to repeated failed attempts." });
            }

            // Wrong password
            if (user.PasswordHash != passwordHash)
            {
                await _loginAttemptService.LogAttemptAsync(user.UserId, email, false, ip, userAgent);
                return Unauthorized(new { message = "Invalid username or password." });
            }

            if (!user.IsActive)
                return Unauthorized(new { message = "User is inactive." });

            // SUCCESS login
            await _loginAttemptService.LogAttemptAsync(user.UserId, email, true, ip, userAgent);
            await _auditLogService.LogAsync(user.UserId, "LoginSuccess", $"IP:{ip}");

            var roles = user.UserRoles.Select(ur => ur.Role.RoleName).ToList();
            var primaryRole = roles.FirstOrDefault() ?? "User";

            // Generate access token
            var accessToken = _tokenService.GenerateToken(user.Email, primaryRole);

            // Create refresh token
            var refreshToken = await _refreshTokenService.CreateRefreshTokenAsync(user.UserId);

            return Ok(new
            {
                message = "Login successful!",
                accessToken,
                refreshToken = refreshToken.Token,
                user = new
                {
                    userId = user.UserId,
                    fullname = user.FullName,
                    email = user.Email,
                    roles
                }
            });
        }

        // ============================================================
        //                     REFRESH TOKEN
        // ============================================================
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request)
        {
            var existing = await _refreshTokenService.GetByTokenAsync(request.RefreshToken);
            if (existing == null || existing.Revoked || existing.ExpiresAt <= DateTime.Now)
                return Unauthorized(new { message = "Invalid or expired refresh token." });

            var user = existing.User;

            // Create new refresh (rotation)
            var newRt = await _refreshTokenService.CreateRefreshTokenAsync(user.UserId);
            await _refreshTokenService.RotateAsync(existing, newRt);

            // New access token
            var roles = user.UserRoles.Select(ur => ur.Role.RoleName).ToList();
            var primaryRole = roles.FirstOrDefault() ?? "User";

            var newAccess = _tokenService.GenerateToken(user.Email, primaryRole);

            return Ok(new
            {
                accessToken = newAccess,
                refreshToken = newRt.Token
            });
        }

        // ============================================================
        //                     LOGOUT
        // ============================================================
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] RefreshTokenRequest request)
        {
            var existing = await _refreshTokenService.GetByTokenAsync(request.RefreshToken);
            if (existing != null)
                await _refreshTokenService.RevokeAsync(existing);

            return Ok(new { message = "Logged out successfully." });
        }

        // ============================================================
        //                     REGISTER
        // ============================================================
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password) ||
                string.IsNullOrWhiteSpace(request.FullName))
            {
                return BadRequest(new { message = "FullName, Email and Password are required." });
            }

            var email = request.Email.Trim().ToLower();
            bool exists = await _context.Users.AnyAsync(u => u.Email == email);

            if (exists) return Conflict(new { message = "Email already registered." });
            if (request.Password.Length < 6)
                return BadRequest(new { message = "Password must be at least 6 characters long." });

            var hashed = Hash(request.Password);

            var user = new Entities.Training.User
            {
                FullName = request.FullName.Trim(),
                Email = email,
                PhoneNumber = request.PhoneNumber,
                DateOfBirth = request.DateOfBirth,
                IsMinor = request.IsMinor,
                PasswordHash = hashed,
                IsActive = true,
                CreatedAt = DateTime.Now
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Assign USER role
            _context.UserRoles.Add(new Entities.Training.UserRole
            {
                UserId = user.UserId,
                RoleId = 2, // User
                AssignedAt = DateTime.Now
            });

            await _context.SaveChangesAsync();

            // Create tokens
            var token = _tokenService.GenerateToken(user.Email, "User");
            var refresh = await _refreshTokenService.CreateRefreshTokenAsync(user.UserId);

            return Ok(new
            {
                message = "Registration successful",
                accessToken = token,
                refreshToken = refresh.Token,
                user = new
                {
                    user.UserId,
                    user.FullName,
                    user.Email
                }
            });
        }
    }
}
