using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Entities.Training;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/accounts")]
    public class AccountsController : ControllerBase
    {
        private readonly TrainingContext _context;

        public AccountsController(TrainingContext context)
        {
            _context = context;
        }

        // 🟢 CREATE — Only Admin or SuperAdmin
        [HttpPost("{userId}/create")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> CreateAccount(long userId, [FromBody] Account account)
        {
            if (account == null)
                return BadRequest(new { message = "Invalid account data" });

            // validate user and branch exist
            var userExists = await _context.Users.AnyAsync(u => u.UserId == userId);
            if (!userExists)
                return NotFound(new { message = "User not found." });

            var branchExists = await _context.Branches.AnyAsync(b => b.BranchId == account.BranchId);
            if (!branchExists)
                return NotFound(new { message = "Branch not found." });

            account.UserId = userId;
            account.AccountNumber = $"ACC{DateTime.Now.Ticks % 10000000000}"; // simple auto number
            account.OpenedOn = DateTime.Now;
            account.IsActive = true;

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "✅ Account created successfully.",
                accountId = account.AccountId,
                account.AccountNumber
            });
        }

        // 🔵 READ — Allowed for all roles
        [HttpGet("{id}/read")]
        [Authorize(Roles = "Viewer,User,Manager,Admin,Super Admin")]
        public async Task<IActionResult> ReadAccount(long id)
        {
            var account = await _context.Accounts
                .Include(a => a.User)
                .Include(a => a.Branch)
                .FirstOrDefaultAsync(a => a.AccountId == id);

            if (account == null)
                return NotFound(new { message = "Account not found." });

            return Ok(new
            {
                account.AccountId,
                account.AccountNumber,
                account.AccountType,
                account.CurrencyCode,
                account.Balance,
                account.InterestRate,
                account.IsActive,
                account.OpenedOn,
                account.ClosedOn,
                User = new { account.User.UserId, account.User.FullName, account.User.Email },
                Branch = new { account.Branch.BranchId, account.Branch.BranchName }
            });
        }

        // 🟡 UPDATE — Manager, Admin, SuperAdmin
        [HttpPut("{id}/update")]
        [Authorize(Roles = "Manager,Admin,Super Admin")]
        public async Task<IActionResult> UpdateAccount(long id, [FromBody] Account updatedAccount)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
                return NotFound(new { message = "Account not found." });

            account.AccountType = updatedAccount.AccountType;
            account.CurrencyCode = updatedAccount.CurrencyCode;
            account.Balance = updatedAccount.Balance;
            account.InterestRate = updatedAccount.InterestRate;
            account.IsActive = updatedAccount.IsActive;
            account.ClosedOn = updatedAccount.ClosedOn;

            _context.Entry(account).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "✅ Account updated successfully." });
        }

        // 🔴 DELETE — Admin or SuperAdmin
        [HttpDelete("{id}/delete")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> DeleteAccount(long id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
                return NotFound(new { message = "Account not found." });

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return Ok(new { message = "❌ Account deleted successfully." });
        }
    }
}
