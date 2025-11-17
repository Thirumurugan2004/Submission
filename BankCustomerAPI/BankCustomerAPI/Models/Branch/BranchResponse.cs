namespace BankCustomerAPI.Models.Branch
{
    public class BranchResponse
    {
        public int BranchId { get; set; }
        public string BranchCode { get; set; } = null!;
        public string BranchName { get; set; } = null!;
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public string Country { get; set; } = null!;
        public string BankName { get; set; } = null!;
    }
}
