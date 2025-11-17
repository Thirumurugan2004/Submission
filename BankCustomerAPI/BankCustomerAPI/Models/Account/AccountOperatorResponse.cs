namespace BankCustomerAPI.Models.Account
{
    public class AccountOperatorResponse
    {
        public long UserId { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = "JointOperator";
    }
}
