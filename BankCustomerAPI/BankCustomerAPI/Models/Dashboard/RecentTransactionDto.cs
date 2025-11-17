namespace BankCustomerAPI.Models.Dashboard
{
    public class RecentTransactionDto
    {
        public string BankName { get; set; } = null!;
        public string AccountNumber { get; set; } = null!;
        public string TransactionType { get; set; } = null!;
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string ReferenceNumber { get; set; } = null!;
    }
}
