namespace BankCustomerAPI.Models.AccountOperators
{
    public class AccountOperatorResponse
    {
        public long UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime AddedOn { get; set; }   // ✔ Now pulled from DB
    }
}
