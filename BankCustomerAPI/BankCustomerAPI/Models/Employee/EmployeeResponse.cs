namespace BankCustomerAPI.Models.Employee
{
    public class EmployeeResponse
    {
        public long EmployeeId { get; set; }
        public string EmployeeCode { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string BranchName { get; set; } = null!;
        public string BankName { get; set; } = null!;
        public string Designation { get; set; } = null!;
        public bool IsActive { get; set; }
        public DateTime HireDate { get; set; }
    }
}
