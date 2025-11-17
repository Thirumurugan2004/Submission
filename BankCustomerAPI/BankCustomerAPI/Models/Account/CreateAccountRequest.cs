namespace BankCustomerAPI.Models.Account
{
    public class CreateAccountRequest
    {
        public int BranchId { get; set; }
        public string AccountType { get; set; } = null!;   // Savings, Current
        public string CurrencyCode { get; set; } = "INR";
        public decimal InitialBalance { get; set; }
        public decimal? InterestRate { get; set; }
    }
}
