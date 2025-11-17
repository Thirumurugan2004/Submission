namespace BankCustomerAPI.Models.Branch
{
    public class UpdateBranchRequest
    {
        public string? BranchName { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
    }
}
