namespace BankCustomerAPI.Models.Account
{
    public class AccountListResponse
    {
        public long AccountId { get; set; }
        public string AccountNumber { get; set; } = null!;
        public string AccountType { get; set; } = null!;
        public decimal Balance { get; set; }
        public string BranchName { get; set; } = null!;
    }
}
