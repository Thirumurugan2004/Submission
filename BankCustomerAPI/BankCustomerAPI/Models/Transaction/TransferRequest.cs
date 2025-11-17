namespace BankCustomerAPI.Models.Transaction
{
    public class TransferRequest
    {
        public long FromAccountId { get; set; }
        public long ToAccountId { get; set; }
        public decimal Amount { get; set; }
        public string? Remarks { get; set; }
    }
}
