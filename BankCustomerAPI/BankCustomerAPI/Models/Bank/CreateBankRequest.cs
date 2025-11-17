namespace BankCustomerAPI.Models.Bank
{
    public class CreateBankRequest
    {
        public string BankName { get; set; } = null!;
        public string? HeadOfficeAddress { get; set; }
        public DateTime? EstablishedDate { get; set; }
    }
}
