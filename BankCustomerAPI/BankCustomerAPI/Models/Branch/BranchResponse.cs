namespace BankCustomerAPI.Models.Branch
{
    public class BranchResponse
    {
        public int BranchId { get; set; }
        public int BankId { get; set; }

        public string BranchCode { get; set; }
        public string BranchName { get; set; }
        public string IFSCCode { get; set; }
        public string? Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }

        public DateTime CreatedAt { get; set; }

        public string BankName { get; set; }
    }
}
