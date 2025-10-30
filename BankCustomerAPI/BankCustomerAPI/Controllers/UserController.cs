using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Entities.Training;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/user/{id}")]
    public class UserController : ControllerBase
    {
        private readonly TrainingContext _context;

        public UserController(TrainingContext context)
        {
            _context = context;
        }

        // 🟢 CREATE — Only Admin or SuperAdmin
        [HttpPost("create")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> CreateUser(long id, [FromBody] User newUser)
        {
            if (newUser == null)
                return BadRequest(new { message = "Invalid user data" });

            newUser.CreatedAt = DateTime.Now;
            newUser.IsActive = true;

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully", userId = newUser.UserId });
        }

        // 🔵 READ — All roles can view
        [HttpGet("read")]
        [Authorize(Roles = "Viewer,User,Manager,Admin,Super Admin")]
        public async Task<IActionResult> ReadUser(long id)
        {
            var user = await _context.Users
                .Where(u => u.UserId == id && u.IsActive)
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound(new { message = "User not found or inactive" });

            return Ok(new
            {
                user.UserId,
                user.FullName,
                user.Email,
                user.IsActive
            });
        }

        // 🟡 UPDATE — Manager, Admin, SuperAdmin
        [HttpPut("update")]
        [Authorize(Roles = "Manager,Admin,Super Admin")]
        public async Task<IActionResult> UpdateUser(long id, [FromBody] User updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            user.FullName = updatedUser.FullName ?? user.FullName;
            user.Email = updatedUser.Email ?? user.Email;
            user.IsActive = updatedUser.IsActive;
            user.UpdatedAt = DateTime.Now;

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "User updated successfully" });
        }

        // 🔴 DELETE (Soft Delete) — Admin or SuperAdmin
        [HttpDelete("delete")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            // Soft Delete — mark inactive instead of removing
            user.IsActive = false;
            user.UpdatedAt = DateTime.Now;

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "User soft-deleted successfully (marked inactive)" });
        }
    }
}
