using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models.Branch;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/branches")]
    public class BranchController : ControllerBase
    {
        private readonly TrainingContext _context;

        public BranchController(TrainingContext context)
        {
            _context = context;
        }

        // CREATE BRANCH
        [HttpPost("create")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> CreateBranch([FromBody] CreateBranchRequest request)
        {
            var bankExists = await _context.Banks.AnyAsync(b => b.BankId == request.BankId);
            if (!bankExists)
                return NotFound(new { message = "Bank not found" });

            var branch = new Branch
            {
                BankId = request.BankId,
                BranchCode = request.BranchCode,
                BranchName = request.BranchName,
                IFSCCode = request.IFSCCode,
                Address = request.Address,
                City = request.City,
                State = request.State,
                Country = request.Country,
                CreatedAt = DateTime.Now
            };

            _context.Branches.Add(branch);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Branch created successfully", branchId = branch.BranchId });
        }

        // GET ALL BRANCHES
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllBranches()
        {
            var branches = await _context.Branches
                .Include(br => br.Bank)
                .Select(br => new BranchResponse
                {
                    BranchId = br.BranchId,
                    BranchCode = br.BranchCode,
                    BranchName = br.BranchName,
                    City = br.City,
                    State = br.State,
                    Country = br.Country,
                    BankName = br.Bank.BankName
                })
                .ToListAsync();

            return Ok(branches);
        }

        // GET BRANCH BY ID
        [HttpGet("{branchId}")]
        [Authorize]
        public async Task<IActionResult> GetBranch(int branchId)
        {
            var br = await _context.Branches
                .Include(b => b.Bank)
                .FirstOrDefaultAsync(b => b.BranchId == branchId);

            if (br == null)
                return NotFound(new { message = "Branch not found" });

            return Ok(new BranchResponse
            {
                BranchId = br.BranchId,
                BranchCode = br.BranchCode,
                BranchName = br.BranchName,
                City = br.City,
                State = br.State,
                Country = br.Country,
                BankName = br.Bank.BankName
            });
        }

        // UPDATE BRANCH
        [HttpPut("{branchId}/update")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> UpdateBranch(int branchId, [FromBody] UpdateBranchRequest request)
        {
            var branch = await _context.Branches.FindAsync(branchId);
            if (branch == null)
                return NotFound(new { message = "Branch not found" });

            branch.BranchName = request.BranchName ?? branch.BranchName;
            branch.Address = request.Address ?? branch.Address;
            branch.City = request.City ?? branch.City;
            branch.State = request.State ?? branch.State;
            branch.Country = request.Country ?? branch.Country;

            _context.Branches.Update(branch);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Branch updated successfully" });
        }

        // DELETE BRANCH
        [HttpDelete("{branchId}/delete")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> DeleteBranch(int branchId)
        {
            var branch = await _context.Branches
                .Include(br => br.Accounts)
                .FirstOrDefaultAsync(br => br.BranchId == branchId);

            if (branch == null)
                return NotFound(new { message = "Branch not found" });

            if (branch.Accounts.Any())
                return BadRequest(new { message = "Cannot delete branch with accounts." });

            _context.Branches.Remove(branch);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Branch deleted successfully" });
        }
    }
}
