using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models.Employee;
using BankCustomerAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/employees")]
    public class EmployeeController : ControllerBase
    {
        private readonly TrainingContext _context;

        public EmployeeController(TrainingContext context)
        {
            _context = context;
        }

        private string GetEmail()
        {
            return
                User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value ??
                User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ??
                throw new Exception("Email not found in token");
        }

        private async Task<User?> GetCurrentUserAsync()
        {
            var email = GetEmail();
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        private bool IsAdmin()
        {
            var role = User.Claims.FirstOrDefault(c => c.Type.Contains("role"))?.Value;
            return role == "Admin" || role == "Super Admin";
        }

        private bool IsManager()
        {
            var role = User.Claims.FirstOrDefault(c => c.Type.Contains("role"))?.Value;
            return role == "Manager";
        }

        // 🔵 CREATE EMPLOYEE (Admin, SuperAdmin)
        [HttpPost("create")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeRequest req)
        {
            // 1) Create user
            string Hash(string password) =>
                Convert.ToBase64String(System.Security.Cryptography.SHA256.HashData(System.Text.Encoding.UTF8.GetBytes(password)));

            var user = new User
            {
                FullName = req.FullName,
                Email = req.Email,
                PasswordHash = Hash(req.Password),
                CreatedAt = DateTime.Now,
                IsActive = true,
                IsMinor = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Add default Employee role
            _context.UserRoles.Add(new UserRole
            {
                UserId = user.UserId,
                RoleId = 1, // Admin gives role assignment later if required
                AssignedAt = DateTime.Now
            });

            // 2) Create employee record
            var emp = new Employee
            {
                UserId = user.UserId,
                BankId = req.BankId,
                BranchId = req.BranchId,
                Designation = req.Designation,
                EmployeeCode = "EMP" + Guid.NewGuid().ToString("N").Substring(0, 6).ToUpper(),
                HireDate = DateTime.Now,
                CreatedAt = DateTime.Now,
                IsActive = true
            };

            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Employee created", employeeId = emp.EmployeeId });
        }

        // 🔵 GET SINGLE EMPLOYEE (Admin, Manager restricted)
        [HttpGet("{id}")]
        [Authorize(Roles = "Manager,Admin,Super Admin")]
        public async Task<IActionResult> GetEmployee(long id)
        {
            var emp = await _context.Employees
                .Include(e => e.User)
                .Include(e => e.Branch).ThenInclude(b => b.Bank)
                .FirstOrDefaultAsync(e => e.EmployeeId == id);

            if (emp == null)
                return NotFound(new { message = "Employee not found" });

            if (IsManager())
            {
                var currentUser = await GetCurrentUserAsync();
                var manager = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == currentUser!.UserId);

                if (manager!.BranchId != emp.BranchId)
                    return Forbid();
            }

            return Ok(new EmployeeResponse
            {
                EmployeeId = emp.EmployeeId,
                EmployeeCode = emp.EmployeeCode,
                FullName = emp.User.FullName,
                Email = emp.User.Email,
                BranchName = emp.Branch.BranchName,
                BankName = emp.Branch.Bank.BankName,
                Designation = emp.Designation,
                IsActive = emp.IsActive,
                HireDate = emp.HireDate
            });
        }

        // 🔵 LIST EMPLOYEES (Paginated)
        [HttpGet("list")]
        [Authorize(Roles = "Manager,Admin,Super Admin")]
        public async Task<IActionResult> ListEmployees([FromQuery] EmployeeListQuery q)
        {
            var baseQuery = _context.Employees
                .Include(e => e.User)
                .Include(e => e.Branch).ThenInclude(b => b.Bank)
                .AsQueryable();

            // Manager restriction
            if (IsManager())
            {
                var currentUser = await GetCurrentUserAsync();
                var manager = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == currentUser!.UserId);
                baseQuery = baseQuery.Where(e => e.BranchId == manager!.BranchId);
            }

            if (q.BankId.HasValue)
                baseQuery = baseQuery.Where(e => e.BankId == q.BankId.Value);

            if (q.BranchId.HasValue)
                baseQuery = baseQuery.Where(e => e.BranchId == q.BranchId.Value);

            if (!string.IsNullOrWhiteSpace(q.Search))
            {
                var s = q.Search.Trim();
                baseQuery = baseQuery.Where(e =>
                    e.User.FullName.Contains(s) ||
                    e.User.Email.Contains(s) ||
                    e.EmployeeCode.Contains(s));
            }

            int page = Math.Max(q.Page, 1);
            int pageSize = Math.Clamp(q.PageSize, 5, 100);

            var total = await baseQuery.LongCountAsync();

            var items = await baseQuery
                .OrderByDescending(e => e.EmployeeId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(emp => new EmployeeResponse
                {
                    EmployeeId = emp.EmployeeId,
                    EmployeeCode = emp.EmployeeCode,
                    FullName = emp.User.FullName,
                    Email = emp.User.Email,
                    BranchName = emp.Branch.BranchName,
                    BankName = emp.Branch.Bank.BankName,
                    Designation = emp.Designation,
                    IsActive = emp.IsActive,
                    HireDate = emp.HireDate
                })
                .ToListAsync();

            return Ok(new PagedResult<EmployeeResponse>
            {
                Page = page,
                PageSize = pageSize,
                TotalRecords = total,
                Items = items
            });
        }

        // 🔵 UPDATE EMPLOYEE (Admin only, Manager can update designation only)
        [HttpPut("{id}/update")]
        [Authorize(Roles = "Manager,Admin,Super Admin")]
        public async Task<IActionResult> UpdateEmployee(long id, [FromBody] UpdateEmployeeRequest req)
        {
            var emp = await _context.Employees.Include(e => e.User).FirstOrDefaultAsync(e => e.EmployeeId == id);
            if (emp == null)
                return NotFound(new { message = "Employee not found" });

            if (IsManager())
            {
                var currentUser = await GetCurrentUserAsync();
                var manager = await _context.Employees.FirstOrDefaultAsync(e => e.UserId == currentUser!.UserId);

                // Manager can ONLY update designation
                if (manager!.BranchId != emp.BranchId)
                    return Forbid();

                if (req.Designation != null)
                    emp.Designation = req.Designation;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Employee updated (manager)" });
            }

            // Admin logic
            if (req.FullName != null) emp.User.FullName = req.FullName;
            if (req.Email != null) emp.User.Email = req.Email;
            if (req.Designation != null) emp.Designation = req.Designation;
            if (req.BankId.HasValue) emp.BankId = req.BankId.Value;
            if (req.BranchId.HasValue) emp.BranchId = req.BranchId.Value;
            if (req.IsActive.HasValue) emp.IsActive = req.IsActive.Value;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Employee updated" });
        }

        // 🔵 DELETE EMPLOYEE (Admin only)
        [HttpDelete("{id}/delete")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> DeleteEmployee(long id)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null)
                return NotFound(new { message = "Employee not found" });

            _context.Employees.Remove(emp);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Employee deleted" });
        }
    }
}
