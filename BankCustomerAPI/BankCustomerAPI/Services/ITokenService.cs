using System.Security.Claims;

namespace BankCustomerAPI.Services
{
    public interface ITokenService
    {
        string GenerateToken(string username, string role);
        string GenerateRefreshTokenString(int size = 64);
        /// <summary>
        /// Validates an expired access token and returns ClaimsPrincipal (lifetime ignored).
        /// Returns null if token invalid.
        /// </summary>
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
    }
}
