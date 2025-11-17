using BankCustomerAPI.Models.Branch;

namespace BankCustomerAPI.Models.Bank
{
    public class BankResponse
    {
        public int BankId { get; set; }
        public string BankName { get; set; } = null!;
        public string? HeadOfficeAddress { get; set; }
        public DateTime? EstablishedDate { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<BranchResponse>? Branches { get; set; }
    }
}
