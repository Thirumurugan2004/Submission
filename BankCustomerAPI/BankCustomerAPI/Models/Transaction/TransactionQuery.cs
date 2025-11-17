namespace BankCustomerAPI.Models.Transaction
{
    public class TransactionQuery
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        public string? TransactionType { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }

        public decimal? MinAmount { get; set; }
        public decimal? MaxAmount { get; set; }

        public string? Search { get; set; }

        public string? SortBy { get; set; }
        public string? SortDir { get; set; }
    }
}
