namespace BankCustomerAPI.Models.Employee
{
    public class UpdateEmployeeRequest
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public bool? IsActive { get; set; }
        public string? Designation { get; set; }
        public int? BankId { get; set; }
        public int? BranchId { get; set; }
    }
}
