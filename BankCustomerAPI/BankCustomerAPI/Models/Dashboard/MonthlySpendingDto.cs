namespace BankCustomerAPI.Models.Dashboard
{
    public class MonthlySpendingDto
    {
        public string Month { get; set; } = null!;
        public decimal TotalSpent { get; set; }
    }
}
