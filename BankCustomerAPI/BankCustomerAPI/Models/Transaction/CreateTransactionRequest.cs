namespace BankCustomerAPI.Models.Transaction
{
    public class CreateTransactionRequest
    {
        public decimal Amount { get; set; }
        public string? Remarks { get; set; }
    }
}
