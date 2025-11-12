using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models;
using BankCustomerAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Linq;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI")] // ✅ Custom route (instead of api/auth)
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly TrainingContext _context;

        public AuthController(ITokenService tokenService, TrainingContext context)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("login")] // ✅ So final URL: BankCustomerAPI/login
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { message = "Username and password are required." });

            // 🔐 Hash input password
            string Hash(string password) =>
                Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(password)));

            var hashedPassword = Hash(request.Password);

            // 🔍 Find user by email (and load roles)
            var user = await _context.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Email == request.Username);

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password." });

            if (user.PasswordHash != hashedPassword)
                return Unauthorized(new { message = "Invalid username or password." });

            if (!user.IsActive)
                return Unauthorized(new { message = "User is inactive." });

            // 🧩 Collect all roles (SuperAdmin will have multiple)
            var roles = user.UserRoles
                .Select(ur => ur.Role.RoleName)
                .ToList();

            // 🔑 Generate JWT token with first role (or extend service to handle multiple)
            // If you want to include *all roles* in the token, modify TokenService accordingly
            var primaryRole = roles.FirstOrDefault() ?? "User";
            var token = _tokenService.GenerateToken(user.Email, primaryRole);

            // ✅ Return login info
            return Ok(new
            {
                username = user.Email,
                fullname = user.FullName,
                roles, // multiple roles
                token,
                userId = user.UserId,
                message = "Login successful!"
            });
        }
    }
}
