using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/user")]
    public class UserController : ControllerBase
    {
        private readonly TrainingContext _context;

        public UserController(TrainingContext context)
        {
            _context = context;
        }

        // ------------------------------------------------------
        // CREATE USER
        // ------------------------------------------------------
        [HttpPost("create")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> CreateUser(long id, [FromBody] CreateUserDto dto)
        {
            if (dto == null)
                return BadRequest(new { message = "Invalid user data" });

            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest(new { message = "Email already exists" });

            var salt = Guid.NewGuid().ToString();
            var passwordHash = Convert.ToBase64String(
                System.Security.Cryptography.SHA256.HashData(
                    System.Text.Encoding.UTF8.GetBytes(dto.Password + salt)
                )
            );

            var newUser = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                DateOfBirth = dto.DateOfBirth,
                PasswordHash = passwordHash,
                Salt = salt,
                CreatedAt = DateTime.Now,
                UpdatedAt = null,
                IsActive = true
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully", userId = newUser.UserId });
        }

        // ------------------------------------------------------
        // READ USER BY ID
        // ------------------------------------------------------
        [HttpGet("{id}/read")]
        [Authorize]
        public async Task<IActionResult> ReadUser(long id)
        {
            var user = await _context.Users
                .Where(u => u.UserId == id && u.IsActive)
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(new
            {
                user.UserId,
                user.FullName,
                user.Email,
                user.IsActive
            });
        }

        // ------------------------------------------------------
        // UPDATE USER
        // ------------------------------------------------------
        [HttpPut("update")]
        [Authorize(Roles = "Manager,Admin,Super Admin")]
        public async Task<IActionResult> UpdateUser(long id, [FromBody] UpdateUserDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            if (!string.IsNullOrWhiteSpace(dto.FullName))
                user.FullName = dto.FullName;

            if (!string.IsNullOrWhiteSpace(dto.Email))
                user.Email = dto.Email;

            if (!string.IsNullOrWhiteSpace(dto.PhoneNumber))
                user.PhoneNumber = dto.PhoneNumber;

            if (dto.DateOfBirth.HasValue)
                user.DateOfBirth = dto.DateOfBirth;

            if (dto.IsActive.HasValue)
                user.IsActive = dto.IsActive.Value;

            user.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(new { message = "User updated successfully" });
        }

        // ------------------------------------------------------
        // SOFT DELETE USER
        // ------------------------------------------------------
        [HttpDelete("{id}/delete")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            user.IsActive = false;
            user.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(new { message = "User soft-deleted successfully" });
        }

        // ------------------------------------------------------
        // GET ALL USERS — CLEAN & FIXED ENDPOINT
        // ------------------------------------------------------
        [HttpGet("all")]
        [Authorize(Roles = "Manager,Admin,Super Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Where(u => u.IsActive)
                .Select(u => new
                {
                    u.UserId,
                    u.FullName,
                    u.Email,
                    u.IsActive,
                    u.CreatedAt,
                    u.UpdatedAt
                })
                .ToListAsync();

            if (!users.Any())
                return NotFound(new { message = "No active users found" });

            return Ok(users);
        }
    }
}
