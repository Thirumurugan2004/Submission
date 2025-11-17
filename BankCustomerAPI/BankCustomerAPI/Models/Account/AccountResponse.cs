using BankCustomerAPI.Models.Branch;

namespace BankCustomerAPI.Models.Account
{
    public class AccountResponse
    {
        public long AccountId { get; set; }
        public string AccountNumber { get; set; } = null!;
        public string AccountType { get; set; } = null!;
        public string CurrencyCode { get; set; } = null!;
        public decimal Balance { get; set; }
        public decimal? InterestRate { get; set; }
        public bool IsActive { get; set; }
        public DateTime OpenedOn { get; set; }
        public DateTime? ClosedOn { get; set; }

        public long UserId { get; set; }
        public string UserName { get; set; } = null!;

        public BranchResponse Branch { get; set; } = null!;
    }
}
