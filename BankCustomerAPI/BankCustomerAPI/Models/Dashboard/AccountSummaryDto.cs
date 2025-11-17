namespace BankCustomerAPI.Models.Dashboard
{
    public class AccountSummaryDto
    {
        public decimal TotalBalance { get; set; }
        public int TotalAccounts { get; set; }
        public int ActiveAccounts { get; set; }
        public int ClosedAccounts { get; set; }
        public int TotalBanks { get; set; }
    }
}
