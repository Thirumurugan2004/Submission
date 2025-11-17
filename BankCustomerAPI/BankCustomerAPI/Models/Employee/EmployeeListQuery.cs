namespace BankCustomerAPI.Models.Employee
{
    public class EmployeeListQuery
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;

        public int? BankId { get; set; }
        public int? BranchId { get; set; }
        public string? Search { get; set; }
        public string? Designation { get; set; }
        public string? SortBy { get; set; } = "EmployeeId";
        public string? SortDir { get; set; } = "desc";
    }
}
