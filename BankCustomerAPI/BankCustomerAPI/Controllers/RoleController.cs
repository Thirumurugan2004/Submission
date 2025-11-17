using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/roles")]
    public class RoleController : ControllerBase
    {
        private readonly TrainingContext _context;

        public RoleController(TrainingContext context)
        {
            _context = context;
        }

        // ============================================================
        //                     ROLE MANAGEMENT
        // ============================================================

        // 🟦 GET ALL ROLES (Admin/SuperAdmin)
        [HttpGet]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _context.Roles
                .Select(r => new { r.RoleId, r.RoleName, r.Description })
                .ToListAsync();

            return Ok(roles);
        }

        // 🟩 GET ROLES FOR A USER
        [HttpGet("{userId}")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> GetUserRoles(long userId)
        {
            var roles = await _context.UserRoles
                .Where(ur => ur.UserId == userId)
                .Include(ur => ur.Role)
                .Select(ur => new
                {
                    ur.Role.RoleId,
                    ur.Role.RoleName,
                    ur.AssignedAt
                })
                .ToListAsync();

            return Ok(roles);
        }

        // 🟧 ASSIGN ROLE
        [HttpPost("{userId}/assign")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> AssignRole(long userId, [FromBody] AssignRoleRequest request)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            var role = await _context.Roles.FindAsync(request.RoleId);
            if (role == null)
                return NotFound(new { message = "Role not found" });

            bool exists = await _context.UserRoles
                .AnyAsync(ur => ur.UserId == userId && ur.RoleId == request.RoleId);

            if (exists)
                return Conflict(new { message = "User already has this role" });

            var userRole = new UserRole
            {
                UserId = userId,
                RoleId = request.RoleId,
                AssignedAt = DateTime.Now
            };

            _context.UserRoles.Add(userRole);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Role '{role.RoleName}' assigned." });
        }

        // 🟥 REMOVE ROLE
        [HttpDelete("{userId}/remove/{roleId}")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> RemoveRole(long userId, int roleId)
        {
            var entry = await _context.UserRoles
                .FirstOrDefaultAsync(ur => ur.UserId == userId && ur.RoleId == roleId);

            if (entry == null)
                return NotFound(new { message = "Role not assigned to user" });

            _context.UserRoles.Remove(entry);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Role removed from user" });
        }
    }
}
