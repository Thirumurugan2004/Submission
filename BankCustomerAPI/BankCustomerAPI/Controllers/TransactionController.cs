using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models;
using BankCustomerAPI.Models.Transaction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/transactions")]
    public class TransactionController : ControllerBase
    {
        private readonly TrainingContext _context;

        public TransactionController(TrainingContext context)
        {
            _context = context;
        }

        private string GenerateReference() =>
            "TXN-" + Guid.NewGuid().ToString("N").Substring(0, 12).ToUpper();

        private string GetEmail()
        {
            return
                User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value ??
                User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ??
                User.Claims.FirstOrDefault(c => c.Type.Contains("email"))?.Value ??
                throw new Exception("Email claim missing");
        }

        // 🔵 DEPOSIT
        [HttpPost("{accountId}/deposit")]
        [Authorize(Roles = "User,Admin,Super Admin")]
        public async Task<IActionResult> Deposit(long accountId, [FromBody] CreateTransactionRequest req)
        {
            if (req.Amount <= 0)
                return BadRequest(new { message = "Amount must be greater than 0" });

            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
                return NotFound(new { message = "Account not found" });

            account.Balance += req.Amount;

            var txn = new Transaction
            {
                AccountId = accountId,
                TransactionType = "DEPOSIT",
                Amount = req.Amount,
                TransactionDate = DateTime.Now,
                PerformedBy = account.UserId,
                Remarks = req.Remarks,
                ReferenceNumber = GenerateReference()
            };

            _context.Transactions.Add(txn);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Deposit successful", txn.ReferenceNumber });
        }

        // 🔵 WITHDRAW
        [HttpPost("{accountId}/withdraw")]
        [Authorize(Roles = "User,Admin,Super Admin")]
        public async Task<IActionResult> Withdraw(long accountId, [FromBody] CreateTransactionRequest req)
        {
            if (req.Amount <= 0)
                return BadRequest(new { message = "Amount must be greater than 0" });

            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
                return NotFound(new { message = "Account not found" });

            if (account.Balance < req.Amount)
                return BadRequest(new { message = "Insufficient balance" });

            account.Balance -= req.Amount;

            var txn = new Transaction
            {
                AccountId = accountId,
                TransactionType = "WITHDRAW",
                Amount = req.Amount,
                TransactionDate = DateTime.Now,
                PerformedBy = account.UserId,
                Remarks = req.Remarks,
                ReferenceNumber = GenerateReference()
            };

            _context.Transactions.Add(txn);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Withdrawal successful", txn.ReferenceNumber });
        }

        // 🔵 TRANSFER (Atomic)
        [HttpPost("transfer")]
        [Authorize(Roles = "User,Admin,Super Admin")]
        public async Task<IActionResult> Transfer([FromBody] TransferRequest req)
        {
            if (req.Amount <= 0)
                return BadRequest(new { message = "Amount must be greater than 0" });

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var from = await _context.Accounts.FindAsync(req.FromAccountId);
                var to = await _context.Accounts.FindAsync(req.ToAccountId);

                if (from == null || to == null)
                    return NotFound(new { message = "One or both accounts not found" });

                if (from.Balance < req.Amount)
                    return BadRequest(new { message = "Insufficient balance" });

                from.Balance -= req.Amount;
                to.Balance += req.Amount;

                _context.Transactions.Add(new Transaction
                {
                    AccountId = from.AccountId,
                    TransactionType = "TRANSFER_OUT",
                    Amount = req.Amount,
                    TransactionDate = DateTime.Now,
                    PerformedBy = from.UserId,
                    Remarks = req.Remarks,
                    ReferenceNumber = GenerateReference()
                });

                _context.Transactions.Add(new Transaction
                {
                    AccountId = to.AccountId,
                    TransactionType = "TRANSFER_IN",
                    Amount = req.Amount,
                    TransactionDate = DateTime.Now,
                    PerformedBy = from.UserId,
                    Remarks = req.Remarks,
                    ReferenceNumber = GenerateReference()
                });

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { message = "Transfer completed successfully" });
            }
            catch
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Transfer failed" });
            }
        }

        // 🔵 BASIC HISTORY
        [HttpGet("{accountId}/history")]
        [Authorize]
        public async Task<IActionResult> History(long accountId)
        {
            var txns = await _context.Transactions
                .Where(t => t.AccountId == accountId)
                .OrderByDescending(t => t.TransactionDate)
                .Select(t => new TransactionResponse
                {
                    TransactionId = t.TransactionId,
                    TransactionType = t.TransactionType,
                    Amount = t.Amount,
                    TransactionDate = t.TransactionDate,
                    ReferenceNumber = t.ReferenceNumber,
                    Remarks = t.Remarks,
                    AccountId = accountId,
                    PerformedBy = t.PerformedBy
                })
                .ToListAsync();

            return Ok(txns);
        }

        // 🔵 FILTER BY DATE RANGE
        [HttpGet("{accountId}/filter")]
        [Authorize]
        public async Task<IActionResult> Filter(long accountId, DateTime from, DateTime to)
        {
            var txns = await _context.Transactions
                .Where(t => t.AccountId == accountId &&
                            t.TransactionDate >= from &&
                            t.TransactionDate <= to)
                .ToListAsync();

            return Ok(txns);
        }

        // 🔵 LAST 5 TRANSACTIONS
        [HttpGet("{accountId}/recent")]
        [Authorize]
        public async Task<IActionResult> Recent(long accountId)
        {
            var txns = await _context.Transactions
                .Where(t => t.AccountId == accountId)
                .OrderByDescending(t => t.TransactionDate)
                .Take(5)
                .ToListAsync();

            return Ok(txns);
        }

        // ----------------------------------------------------------------------
        // 🟣 UPDATED: PAGINATED ACCOUNT TRANSACTIONS
        // ----------------------------------------------------------------------
        [HttpGet("{accountId}/list")]
        [Authorize]
        public async Task<IActionResult> GetAccountTransactions(long accountId, [FromQuery] TransactionQuery q)
        {
            var page = Math.Max(1, q.Page);
            var pageSize = Math.Clamp(q.PageSize, 5, 200);

            // Validate account
            var account = await _context.Accounts.Include(a => a.User)
                .FirstOrDefaultAsync(a => a.AccountId == accountId);

            if (account == null)
                return NotFound(new { message = "Account not found" });

            // Restrict normal users to their own accounts
            var role = User.Claims.FirstOrDefault(c => c.Type.Contains("role"))?.Value;
            if (role == "User")
            {
                var email = GetEmail();
                var user = await _context.Users.FirstAsync(u => u.Email == email);

                if (user.UserId != account.UserId)
                    return Forbid();
            }

            // Base Query
            IQueryable<Transaction> baseQuery = _context.Transactions
                .Where(t => t.AccountId == accountId);

            // Filters
            if (!string.IsNullOrWhiteSpace(q.TransactionType))
                baseQuery = baseQuery.Where(t => t.TransactionType == q.TransactionType);

            if (q.DateFrom.HasValue)
                baseQuery = baseQuery.Where(t => t.TransactionDate >= q.DateFrom.Value);

            if (q.DateTo.HasValue)
                baseQuery = baseQuery.Where(t => t.TransactionDate <= q.DateTo.Value);

            if (q.MinAmount.HasValue)
                baseQuery = baseQuery.Where(t => t.Amount >= q.MinAmount.Value);

            if (q.MaxAmount.HasValue)
                baseQuery = baseQuery.Where(t => t.Amount <= q.MaxAmount.Value);

            if (!string.IsNullOrWhiteSpace(q.Search))
            {
                var s = q.Search.Trim();

                baseQuery = baseQuery.Where(t =>
                    t.Remarks.Contains(s) ||
                    t.ReferenceNumber.Contains(s) ||
                    t.TransactionType.Contains(s));
            }

            // Sort whitelist
            var allowed = new Dictionary<string, Expression<Func<Transaction, object>>>()
            {
                ["TransactionDate"] = t => t.TransactionDate,
                ["Amount"] = t => t.Amount,
                ["TransactionType"] = t => t.TransactionType,
                ["ReferenceNumber"] = t => t.ReferenceNumber
            };

            var sortBy = q.SortBy ?? "TransactionDate";
            if (!allowed.ContainsKey(sortBy))
                sortBy = "TransactionDate";

            var sortDir = (q.SortDir ?? "desc").ToLower() == "asc" ? "asc" : "desc";

            var ordered =
                sortDir == "asc"
                    ? baseQuery.OrderBy(allowed[sortBy])
                    : baseQuery.OrderByDescending(allowed[sortBy]);

            // Paging
            var total = await ordered.CountAsync();

            var items = await ordered
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TransactionResponse
                {
                    TransactionId = t.TransactionId,
                    TransactionType = t.TransactionType,
                    Amount = t.Amount,
                    TransactionDate = t.TransactionDate,
                    ReferenceNumber = t.ReferenceNumber,
                    Remarks = t.Remarks,
                    AccountId = t.AccountId,
                    PerformedBy = t.PerformedBy
                })
                .ToListAsync();

            return Ok(new PagedResult<TransactionResponse>
            {
                Page = page,
                PageSize = pageSize,
                TotalRecords = total,
                Items = items
            });
        }
    }
}
