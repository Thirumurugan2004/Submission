namespace BankCustomerAPI.Services
{
    public interface ITokenService
    {
        string GenerateToken(string username, string role);
    }
}
