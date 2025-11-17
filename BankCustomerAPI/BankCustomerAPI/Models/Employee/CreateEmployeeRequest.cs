namespace BankCustomerAPI.Models.Employee
{
    public class CreateEmployeeRequest
    {
        // User Information
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;

        // Employee Information
        public int BankId { get; set; }
        public int BranchId { get; set; }
        public string Designation { get; set; } = null!;
    }
}
