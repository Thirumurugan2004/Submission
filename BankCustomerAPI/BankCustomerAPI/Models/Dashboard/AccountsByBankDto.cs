namespace BankCustomerAPI.Models.Dashboard
{
    public class AccountsByBankDto
    {
        public string BankName { get; set; } = null!;
        public decimal TotalBalance { get; set; }
        public int AccountCount { get; set; }
        public List<AccountInfoDto> Accounts { get; set; } = new();
    }

    public class AccountInfoDto
    {
        public long AccountId { get; set; }
        public string AccountNumber { get; set; } = null!;
        public string AccountType { get; set; } = null!;
        public decimal Balance { get; set; }
        public string BranchName { get; set; } = null!;
    }
}
