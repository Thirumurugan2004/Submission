using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models.Dashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/accounts")]
    public class AccountSummaryController : ControllerBase
    {
        private readonly TrainingContext _context;

        public AccountSummaryController(TrainingContext context)
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

        // 1️⃣ ACCOUNT SUMMARY
        [HttpGet("summary")]
        [Authorize]
        public async Task<IActionResult> GetSummary()
        {
            var email = GetEmail();
            var user = await _context.Users.FirstAsync(u => u.Email == email);

            var accounts = await _context.Accounts
                .Where(a => a.UserId == user.UserId)
                .ToListAsync();

            var summary = new AccountSummaryDto
            {
                TotalBalance = accounts.Sum(a => a.Balance),
                TotalAccounts = accounts.Count,
                ActiveAccounts = accounts.Count(a => a.IsActive),
                ClosedAccounts = accounts.Count(a => !a.IsActive),
                TotalBanks = accounts.Select(a => a.Branch.BankId).Distinct().Count()
            };

            return Ok(summary);
        }

        // 2️⃣ ACCOUNTS GROUPED BY BANK
        [HttpGet("by-bank")]
        [Authorize]
        public async Task<IActionResult> GetByBank()
        {
            var email = GetEmail();
            var user = await _context.Users.FirstAsync(u => u.Email == email);

            var accounts = await _context.Accounts
                .Include(a => a.Branch)
                .ThenInclude(b => b.Bank)
                .Where(a => a.UserId == user.UserId)
                .ToListAsync();

            var grouped = accounts
                .GroupBy(a => a.Branch.Bank.BankName)
                .Select(g => new AccountsByBankDto
                {
                    BankName = g.Key,
                    TotalBalance = g.Sum(a => a.Balance),
                    AccountCount = g.Count(),
                    Accounts = g.Select(a => new AccountInfoDto
                    {
                        AccountId = a.AccountId,
                        AccountNumber = a.AccountNumber,
                        AccountType = a.AccountType,
                        Balance = a.Balance,
                        BranchName = a.Branch.BranchName
                    }).ToList()
                }).ToList();

            return Ok(grouped);
        }

        // 3️⃣ RECENT TRANSACTIONS (Last 10 across all accounts)
        [HttpGet("recent-transactions")]
        [Authorize]
        public async Task<IActionResult> RecentTransactions()
        {
            var email = GetEmail();
            var user = await _context.Users.FirstAsync(u => u.Email == email);

            var txns = await _context.Transactions
                .Include(t => t.Account)
                .ThenInclude(a => a.Branch)
                .ThenInclude(b => b.Bank)
                .Where(t => t.Account.UserId == user.UserId)
                .OrderByDescending(t => t.TransactionDate)
                .Take(10)
                .Select(t => new RecentTransactionDto
                {
                    BankName = t.Account.Branch.Bank.BankName,
                    AccountNumber = t.Account.AccountNumber,
                    TransactionType = t.TransactionType,
                    Amount = t.Amount,
                    TransactionDate = t.TransactionDate,
                    ReferenceNumber = t.ReferenceNumber
                })
                .ToListAsync();

            return Ok(txns);
        }

        // 4️⃣ PORTFOLIO (Percentage by account type)
        [HttpGet("portfolio")]
        [Authorize]
        public async Task<IActionResult> Portfolio()
        {
            var email = GetEmail();
            var user = await _context.Users.FirstAsync(u => u.Email == email);

            var accounts = await _context.Accounts
                .Where(a => a.UserId == user.UserId)
                .ToListAsync();

            var total = accounts.Sum(a => a.Balance);

            var data = accounts
                .GroupBy(a => a.AccountType)
                .Select(g => new
                {
                    AccountType = g.Key,
                    Amount = g.Sum(a => a.Balance),
                    Percentage = total == 0 ? 0 : Math.Round(g.Sum(a => a.Balance) / total * 100, 2)
                })
                .ToList();

            return Ok(data);
        }

        // 5️⃣ MONTHLY SPENDING (Last 6 months)
        [HttpGet("spending/monthly")]
        [Authorize]
        public async Task<IActionResult> MonthlySpending()
        {
            var email = GetEmail();
            var user = await _context.Users.FirstAsync(u => u.Email == email);

            var txns = await _context.Transactions
                .Where(t =>
                    t.Account.UserId == user.UserId &&
                    t.TransactionDate >= DateTime.Now.AddMonths(-6) &&
                    t.TransactionType.Contains("WITHDRAW"))
                .ToListAsync();

            var data = txns
                .GroupBy(t => t.TransactionDate.ToString("yyyy-MM"))
                .Select(g => new MonthlySpendingDto
                {
                    Month = g.Key,
                    TotalSpent = g.Sum(t => t.Amount)
                })
                .OrderBy(x => x.Month)
                .ToList();

            return Ok(data);
        }
    }
}
