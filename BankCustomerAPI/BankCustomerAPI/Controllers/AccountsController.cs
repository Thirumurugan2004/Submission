using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models.Account;
using BankCustomerAPI.Models.Branch;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/accounts")]
    public class AccountController : ControllerBase
    {
        private readonly TrainingContext _context;

        public AccountController(TrainingContext context)
        {
            _context = context;
        }

        // ----------------------------------------------------------------------
        // 🔧 Helper to extract email from JWT
        // ----------------------------------------------------------------------
        private string GetEmail()
        {
            return
                User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value ??
                User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ??
                User.Claims.FirstOrDefault(c => c.Type.Contains("email"))?.Value ??
                throw new Exception("Email claim not found in token");
        }

        // ----------------------------------------------------------------------
        // 1️⃣ CREATE ACCOUNT (Admin Only)
        // ----------------------------------------------------------------------
        [HttpPost("{userId}/create")]
        [Authorize(Roles = "User,Admin,Super Admin")]
        public async Task<IActionResult> CreateAccount(long userId, [FromBody] CreateAccountRequest req)
        {
            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value ?? "";
            var tokenUserIdStr = User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;

            // If caller is a user, they can create ONLY their own account
            if (role.Equals("User", StringComparison.OrdinalIgnoreCase))
            {
                if (!long.TryParse(tokenUserIdStr, out var tokenUserId) || tokenUserId != userId)
                    return Forbid();  // user trying to create account for another user
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            var branch = await _context.Branches.FindAsync(req.BranchId);
            if (branch == null)
                return NotFound(new { message = "Branch not found" });

            var account = new Account
            {
                UserId = userId,
                BranchId = req.BranchId,
                AccountType = req.AccountType,
                CurrencyCode = req.CurrencyCode,
                InterestRate = req.InterestRate,
                Balance = req.InitialBalance,
                AccountNumber = "ACCT" + Guid.NewGuid().ToString("N").Substring(0, 10),
                OpenedOn = DateTime.Now,
                IsActive = true
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Account created",
                accountId = account.AccountId,
                account.AccountNumber
            });
        }


        // ----------------------------------------------------------------------
        // 2️⃣ GET LOGGED-IN USER'S ACCOUNTS
        // ----------------------------------------------------------------------
        [HttpGet("my")]
        [Authorize(Roles = "User,Admin,Super Admin")]
        public async Task<IActionResult> GetMyAccounts()
        {
            var email = GetEmail();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return NotFound(new { message = "User not found" });

            var accounts = await _context.Accounts
                .Include(a => a.Branch)
                .Where(a => a.UserId == user.UserId)
                .Select(a => new AccountListResponse
                {
                    AccountId = a.AccountId,
                    AccountNumber = a.AccountNumber,
                    AccountType = a.AccountType,
                    Balance = a.Balance,
                    BranchName = a.Branch.BranchName
                })
                .ToListAsync();

            return Ok(accounts);
        }

        // ----------------------------------------------------------------------
        // 3️⃣ GET ALL ACCOUNTS (ADMIN/MANAGER)
        // ----------------------------------------------------------------------
        [HttpGet("all")]
        [Authorize(Roles = "Manager,Admin,Super Admin")]
        public async Task<IActionResult> GetAllAccounts()
        {
            var accounts = await _context.Accounts
                .Include(a => a.Branch)
                .Include(a => a.User)
                .Select(a => new AccountResponse
                {
                    AccountId = a.AccountId,
                    AccountNumber = a.AccountNumber,
                    AccountType = a.AccountType,
                    CurrencyCode = a.CurrencyCode,
                    Balance = a.Balance,
                    InterestRate = a.InterestRate,
                    IsActive = a.IsActive,
                    OpenedOn = a.OpenedOn,
                    ClosedOn = a.ClosedOn,
                    UserId = a.UserId,
                    UserName = a.User.FullName,
                    Branch = new BranchResponse
                    {
                        BranchId = a.Branch.BranchId,
                        BranchCode = a.Branch.BranchCode,
                        BranchName = a.Branch.BranchName,
                        City = a.Branch.City,
                        State = a.Branch.State,
                        Country = a.Branch.Country,
                        BankName = a.Branch.Bank.BankName
                    }
                })
                .ToListAsync();

            return Ok(accounts);
        }

        // ----------------------------------------------------------------------
        // 4️⃣ GET ACCOUNT BY ID
        // ----------------------------------------------------------------------
        [HttpGet("{accountId}")]
        [Authorize]
        public async Task<IActionResult> GetAccount(long accountId)
        {
            var a = await _context.Accounts
                .Include(a => a.Branch)
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.AccountId == accountId);

            if (a == null)
                return NotFound(new { message = "Account not found" });

            return Ok(new AccountResponse
            {
                AccountId = a.AccountId,
                AccountNumber = a.AccountNumber,
                AccountType = a.AccountType,
                CurrencyCode = a.CurrencyCode,
                Balance = a.Balance,
                InterestRate = a.InterestRate,
                IsActive = a.IsActive,
                OpenedOn = a.OpenedOn,
                ClosedOn = a.ClosedOn,
                UserId = a.UserId,
                UserName = a.User.FullName,
                Branch = new BranchResponse
                {
                    BranchId = a.Branch.BranchId,
                    BranchCode = a.Branch.BranchCode,
                    BranchName = a.Branch.BranchName,
                    City = a.Branch.City,
                    State = a.Branch.State,
                    Country = a.Branch.Country,
                    BankName = a.Branch.Bank.BankName
                }
            });
        }

        // ----------------------------------------------------------------------
        // 5️⃣ UPDATE ACCOUNT
        // ----------------------------------------------------------------------
        [HttpPut("{accountId}/update")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> UpdateAccount(long accountId, [FromBody] UpdateAccountRequest req)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
                return NotFound(new { message = "Account not found" });

            if (req.AccountType != null) account.AccountType = req.AccountType;
            if (req.InterestRate != null) account.InterestRate = req.InterestRate;
            if (req.IsActive != null) account.IsActive = req.IsActive.Value;
            if (req.ClosedOn != null) account.ClosedOn = req.ClosedOn;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Account updated" });
        }

        [HttpPut("{accountId}/close")]
        [Authorize(Roles = "User,Admin,Super Admin")]
        public async Task<IActionResult> CloseAccount(long accountId)
        {
            try
            {
                var account = await _context.Accounts.FindAsync(accountId);
                if (account == null)
                    return NotFound(new { message = "Account not found" });

                // Already closed?
                if (!account.IsActive)
                    return BadRequest(new { message = "Account already closed" });

                // get logged in email
                var email = User.Claims.FirstOrDefault(c =>
                                c.Type == JwtRegisteredClaimNames.Sub ||
                                c.Type == ClaimTypes.NameIdentifier ||
                                c.Type.Contains("email"))?.Value;

                if (email == null)
                    return Unauthorized(new { message = "Email missing in token" });

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
                if (user == null)
                    return Unauthorized(new { message = "User not found" });

                // roles
                var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
                bool isNormalUser = roles.Contains("User") && !roles.Contains("Admin") && !roles.Contains("Super Admin");

                // user tries to close someone else's account
                if (isNormalUser && account.UserId != user.UserId)
                    return Forbid();

                // CLOSE ACCOUNT
                account.IsActive = false;
                account.ClosedOn = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Account closed successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error", error = ex.Message });
            }
        }

    }
}
