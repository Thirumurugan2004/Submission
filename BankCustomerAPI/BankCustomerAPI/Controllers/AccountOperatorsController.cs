using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models.AccountOperators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/accounts/{accountId}/operators")]
    public class AccountOperatorsController : ControllerBase
    {
        private readonly TrainingContext _context;

        public AccountOperatorsController(TrainingContext context)
        {
            _context = context;
        }

        private string GetEmail()
        {
            return
                User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value ??
                User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ??
                User.Claims.FirstOrDefault(c => c.Type.Contains("email"))?.Value ??
                throw new Exception("Email claim not found in token");
        }

        // ----------------------------------------------------------------------
        // 1️⃣ LIST JOINT ACCOUNT OPERATORS
        // ----------------------------------------------------------------------
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetOperators(long accountId)
        {
            var email = GetEmail();
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            var account = await _context.Accounts
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.AccountId == accountId);

            if (account == null)
                return NotFound(new { message = "Account not found" });

            var role = User.Claims.FirstOrDefault(c => c.Type.Contains("role"))?.Value;

            if (role == "User" && account.UserId != currentUser!.UserId)
                return Forbid();

            var ops = await _context.AccountOperators
                .Include(o => o.User)
                .Where(o => o.AccountId == accountId)
                .Select(o => new AccountOperatorResponse
                {
                    UserId = o.User.UserId,
                    FullName = o.User.FullName,
                    Email = o.User.Email,
                    AddedOn = o.AddedOn
                })
                .ToListAsync();

            return Ok(ops);
        }

        // ----------------------------------------------------------------------
        // 2️⃣ ADD JOINT ACCOUNT OPERATOR
        // ----------------------------------------------------------------------
        [HttpPost("add")]
        [Authorize(Roles = "User,Manager,Admin,Super Admin")]
        public async Task<IActionResult> AddOperator(long accountId, [FromBody] AddOperatorRequest req)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
                return NotFound(new { message = "Account not found" });

            var operatorUser = await _context.Users.FindAsync(req.OperatorUserId);
            if (operatorUser == null)
                return NotFound(new { message = "User to add not found" });

            var role = User.Claims.FirstOrDefault(c => c.Type.Contains("role"))?.Value;
            var email = GetEmail();
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (role == "User" && account.UserId != currentUser!.UserId)
                return Forbid();

            bool exists = await _context.AccountOperators
                .AnyAsync(o => o.AccountId == accountId && o.OperatorUserId == req.OperatorUserId);

            if (exists)
                return BadRequest(new { message = "Operator already added" });

            _context.AccountOperators.Add(new AccountOperator
            {
                AccountId = accountId,
                OperatorUserId = req.OperatorUserId,
                AddedOn = DateTime.Now
            });

            await _context.SaveChangesAsync();

            return Ok(new { message = "Joint operator added successfully" });
        }

        // ----------------------------------------------------------------------
        // 3️⃣ REMOVE JOINT ACCOUNT OPERATOR
        // ----------------------------------------------------------------------
        [HttpPost("remove")]
        [Authorize(Roles = "User,Admin,Super Admin")]
        public async Task<IActionResult> RemoveOperator(long accountId, [FromBody] RemoveOperatorRequest req)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
                return NotFound(new { message = "Account not found" });

            var role = User.Claims.FirstOrDefault(c => c.Type.Contains("role"))?.Value;
            var email = GetEmail();
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (role == "User" && account.UserId != currentUser!.UserId)
                return Forbid();

            var op = await _context.AccountOperators
                .FirstOrDefaultAsync(o => o.AccountId == accountId && o.OperatorUserId == req.OperatorUserId);

            if (op == null)
                return NotFound(new { message = "Operator not found" });

            _context.AccountOperators.Remove(op);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Operator removed successfully" });
        }
    }
}
