namespace BankCustomerAPI.Models.Bank
{
    public class UpdateBankRequest
    {
        public string? BankName { get; set; }
        public string? HeadOfficeAddress { get; set; }
        public DateTime? EstablishedDate { get; set; }
    }
}
