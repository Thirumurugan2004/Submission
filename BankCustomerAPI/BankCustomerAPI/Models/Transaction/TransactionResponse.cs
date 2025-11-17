namespace BankCustomerAPI.Models.Transaction
{
    public class TransactionResponse
    {
        public long TransactionId { get; set; }
        public string TransactionType { get; set; } = null!;
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string ReferenceNumber { get; set; } = null!;
        public string? Remarks { get; set; }
        public long AccountId { get; set; }
        public long PerformedBy { get; set; }
    }
}
