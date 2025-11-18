using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Services
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly TrainingContext _context;
        private readonly ITokenService _tokenService;

        public RefreshTokenService(TrainingContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        /// <summary>
        /// Creates a new refresh token entry in DB.
        /// </summary>
        public async Task<RefreshToken> CreateRefreshTokenAsync(long userId, string? replacedBy = null, int daysValid = 30)
        {
            var tokenString = _tokenService.GenerateRefreshTokenString();

            var refresh = new RefreshToken
            {
                UserId = userId,
                Token = tokenString,
                ExpiresAt = DateTime.UtcNow.AddDays(daysValid),
                CreatedAt = DateTime.UtcNow,
                Revoked = false,
                ReplacedByToken = replacedBy
            };

            _context.RefreshTokens.Add(refresh);
            await _context.SaveChangesAsync();

            return refresh;
        }

        /// <summary>
        /// Gets a refresh token (including user navigation property).
        /// </summary>
        public async Task<RefreshToken?> GetByTokenAsync(string token)
        {
            return await _context.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == token);
        }

        /// <summary>
        /// Marks token as revoked. (Logout)
        /// </summary>
        public async Task RevokeAsync(RefreshToken token, string? replacedByToken = null)
        {
            token.Revoked = true;

            if (!string.IsNullOrWhiteSpace(replacedByToken))
                token.ReplacedByToken = replacedByToken;

            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Rotates refresh tokens: old one revoked, new one created.
        /// </summary>
        public async Task RotateAsync(RefreshToken existing, RefreshToken newToken)
        {
            existing.Revoked = true;
            existing.ReplacedByToken = newToken.Token;

            _context.RefreshTokens.Add(newToken);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Returns all valid (not expired, not revoked) refresh tokens for the user.
        /// Useful for multi-device session management.
        /// </summary>
        public async Task<IEnumerable<RefreshToken>> GetActiveTokensForUserAsync(long userId)
        {
            return await _context.RefreshTokens
                .Where(rt => rt.UserId == userId && !rt.Revoked && rt.ExpiresAt > DateTime.UtcNow)
                .ToListAsync();
        }
    }
}
