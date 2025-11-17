namespace BankCustomerAPI.Models.Account
{
    public class AccountListQuery
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string? Search { get; set; }         // account number / user / bank / branch
        public string? SortBy { get; set; } = "AccountId";
        public string? SortDir { get; set; } = "desc";
        public string? AccountType { get; set; }    // Savings, Current...
        public int? BankId { get; set; }
        public int? BranchId { get; set; }
        public decimal? MinBalance { get; set; }
        public decimal? MaxBalance { get; set; }
    }
}
