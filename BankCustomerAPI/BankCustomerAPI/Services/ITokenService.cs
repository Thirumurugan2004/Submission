using System.Security.Claims;

namespace BankCustomerAPI.Services
{
    public interface ITokenService
    {
        string GenerateToken(string username, string role, long userId);
        string GenerateRefreshTokenString(int size = 64);
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
    }
}
