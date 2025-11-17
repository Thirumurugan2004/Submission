namespace BankCustomerAPI.Models.Branch
{
    public class CreateBranchRequest
    {
        public int BankId { get; set; }
        public string BranchCode { get; set; } = null!;
        public string BranchName { get; set; } = null!;
        public string IFSCCode { get; set; } = null!;
        public string? Address { get; set; }
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public string Country { get; set; } = "India";
    }
}
