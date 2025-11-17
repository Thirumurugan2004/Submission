using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models;
using BankCustomerAPI.Models.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/accounts")]
    public class AccountsQueryController : ControllerBase
    {
        private readonly TrainingContext _context;

        public AccountsQueryController(TrainingContext context)
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
        // 🔎 PAGINATED ACCOUNT LIST (Search, Sort, Filters)
        // GET /BankCustomerAPI/accounts/list
        // ----------------------------------------------------------------------
        [HttpGet("list")]
        [Authorize(Roles = "Manager,Admin,Super Admin,User")]
        public async Task<IActionResult> GetAccountsList([FromQuery] AccountListQuery q)
        {
            var page = Math.Max(1, q.Page);
            var pageSize = Math.Clamp(q.PageSize, 5, 200);

            IQueryable<Account> baseQuery = _context.Accounts
                .Include(a => a.User)
                .Include(a => a.Branch).ThenInclude(b => b.Bank);

            // --- Restrict normal users to their own accounts ---
            var role = User.Claims.FirstOrDefault(c => c.Type.Contains("role"))?.Value;
            if (role == "User")
            {
                var email = GetEmail();
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
                if (user == null) return Forbid();

                baseQuery = baseQuery.Where(a => a.UserId == user.UserId);
            }

            // --- Filters ---
            if (!string.IsNullOrWhiteSpace(q.AccountType))
                baseQuery = baseQuery.Where(a => a.AccountType == q.AccountType);

            if (q.BankId.HasValue)
                baseQuery = baseQuery.Where(a => a.Branch.BankId == q.BankId.Value);

            if (q.BranchId.HasValue)
                baseQuery = baseQuery.Where(a => a.BranchId == q.BranchId.Value);

            if (q.MinBalance.HasValue)
                baseQuery = baseQuery.Where(a => a.Balance >= q.MinBalance.Value);

            if (q.MaxBalance.HasValue)
                baseQuery = baseQuery.Where(a => a.Balance <= q.MaxBalance.Value);

            if (!string.IsNullOrWhiteSpace(q.Search))
            {
                var s = q.Search.Trim();
                baseQuery = baseQuery.Where(a =>
                    a.AccountNumber.Contains(s) ||
                    a.User.FullName.Contains(s) ||
                    a.Branch.BranchName.Contains(s) ||
                    a.Branch.Bank.BankName.Contains(s));
            }

            // --- Sort Whitelist ---
            var sortBy = (q.SortBy ?? "AccountId").Trim();
            var sortDir = (q.SortDir ?? "desc").ToLower() == "asc" ? "asc" : "desc";

            var allowed = new Dictionary<string, Expression<Func<Account, object>>>()
            {
                ["AccountId"] = a => a.AccountId,
                ["AccountNumber"] = a => a.AccountNumber,
                ["Balance"] = a => a.Balance,
                ["OpenedOn"] = a => a.OpenedOn,
                ["AccountType"] = a => a.AccountType
            };

            if (!allowed.ContainsKey(sortBy))
                sortBy = "AccountId";

            var ordered = sortDir == "asc"
                ? baseQuery.OrderBy(allowed[sortBy])
                : baseQuery.OrderByDescending(allowed[sortBy]);

            var total = await ordered.CountAsync();

            var items = await ordered
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(a => new AccountListResponse
                {
                    AccountId = a.AccountId,
                    AccountNumber = a.AccountNumber,
                    AccountType = a.AccountType,
                    Balance = a.Balance,
                    BranchName = a.Branch.BranchName
                })
                .ToListAsync();

            return Ok(new PagedResult<AccountListResponse>
            {
                Page = page,
                PageSize = pageSize,
                TotalRecords = total,
                Items = items
            });
        }
    }
}
