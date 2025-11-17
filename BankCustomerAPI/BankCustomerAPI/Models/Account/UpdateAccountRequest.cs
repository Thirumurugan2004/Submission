namespace BankCustomerAPI.Models.Account
{
    public class UpdateAccountRequest
    {
        public string? AccountType { get; set; }
        public decimal? InterestRate { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? ClosedOn { get; set; }
    }
}
