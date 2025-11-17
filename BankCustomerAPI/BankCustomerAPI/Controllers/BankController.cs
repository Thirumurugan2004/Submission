using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Infrastructure.Data;
using BankCustomerAPI.Models.Bank;
using BankCustomerAPI.Models.Branch;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("BankCustomerAPI/banks")]
    public class BankController : ControllerBase
    {
        private readonly TrainingContext _context;

        public BankController(TrainingContext context)
        {
            _context = context;
        }

        // CREATE BANK
        [HttpPost("create")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> CreateBank([FromBody] CreateBankRequest request)
        {
            var bank = new Bank
            {
                BankName = request.BankName,
                HeadOfficeAddress = request.HeadOfficeAddress,
                EstablishedDate = request.EstablishedDate,
                CreatedAt = DateTime.Now
            };

            _context.Banks.Add(bank);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Bank created successfully", bankId = bank.BankId });
        }

        // GET ALL BANKS
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllBanks()
        {
            var banks = await _context.Banks
                .Select(b => new BankResponse
                {
                    BankId = b.BankId,
                    BankName = b.BankName,
                    HeadOfficeAddress = b.HeadOfficeAddress,
                    EstablishedDate = b.EstablishedDate,
                    CreatedAt = b.CreatedAt
                })
                .ToListAsync();

            return Ok(banks);
        }

        // GET BANK BY ID WITH BRANCHES
        [HttpGet("{bankId}")]
        [Authorize]
        public async Task<IActionResult> GetBank(int bankId)
        {
            var bank = await _context.Banks
                .Include(b => b.Branches)
                .FirstOrDefaultAsync(b => b.BankId == bankId);

            if (bank == null)
                return NotFound(new { message = "Bank not found" });

            var response = new BankResponse
            {
                BankId = bank.BankId,
                BankName = bank.BankName,
                HeadOfficeAddress = bank.HeadOfficeAddress,
                EstablishedDate = bank.EstablishedDate,
                CreatedAt = bank.CreatedAt,
                Branches = bank.Branches.Select(br => new BranchResponse
                {
                    BranchId = br.BranchId,
                    BranchCode = br.BranchCode,
                    BranchName = br.BranchName,
                    City = br.City,
                    State = br.State,
                    Country = br.Country,
                    BankName = bank.BankName
                }).ToList()
            };

            return Ok(response);
        }

        // UPDATE BANK
        [HttpPut("{bankId}/update")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> UpdateBank(int bankId, [FromBody] UpdateBankRequest request)
        {
            var bank = await _context.Banks.FindAsync(bankId);
            if (bank == null)
                return NotFound(new { message = "Bank not found" });

            bank.BankName = request.BankName ?? bank.BankName;
            bank.HeadOfficeAddress = request.HeadOfficeAddress ?? bank.HeadOfficeAddress;
            bank.EstablishedDate = request.EstablishedDate ?? bank.EstablishedDate;

            _context.Update(bank);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Bank updated successfully" });
        }

        // DELETE BANK
        [HttpDelete("{bankId}/delete")]
        [Authorize(Roles = "Admin,Super Admin")]
        public async Task<IActionResult> DeleteBank(int bankId)
        {
            var bank = await _context.Banks
                .Include(b => b.Branches)
                .FirstOrDefaultAsync(b => b.BankId == bankId);

            if (bank == null)
                return NotFound(new { message = "Bank not found" });

            if (bank.Branches.Any())
                return BadRequest(new { message = "Cannot delete bank with branches." });

            _context.Banks.Remove(bank);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Bank deleted successfully" });
        }
    }
}
