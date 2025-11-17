using BankCustomerAPI.Entities.Training;

namespace BankCustomerAPI.Services
{
    public interface IRefreshTokenService
    {
        Task<RefreshToken> CreateRefreshTokenAsync(long userId, string? replacedBy = null, int daysValid = 30);
        Task<RefreshToken?> GetByTokenAsync(string token);
        Task RevokeAsync(RefreshToken token, string? replacedByToken = null);
        Task RotateAsync(RefreshToken existing, RefreshToken newToken);
        Task<IEnumerable<RefreshToken>> GetActiveTokensForUserAsync(long userId);
    }
}
