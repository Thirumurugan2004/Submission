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

        public async Task<RefreshToken> CreateRefreshTokenAsync(long userId, string? replacedBy = null, int daysValid = 30)
        {
            var tokenString = _tokenService.GenerateRefreshTokenString();
            var rt = new RefreshToken
            {
                UserId = userId,
                Token = tokenString,
                ExpiresAt = DateTime.Now.AddDays(daysValid),
                CreatedAt = DateTime.Now,
                Revoked = false,
                ReplacedByToken = replacedBy
            };
            _context.RefreshTokens.Add(rt);
            await _context.SaveChangesAsync();
            return rt;
        }

        public async Task<RefreshToken?> GetByTokenAsync(string token)
        {
            return await _context.RefreshTokens
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Token == token);
        }

        public async Task RevokeAsync(RefreshToken token, string? replacedByToken = null)
        {
            token.Revoked = true;
            if (!string.IsNullOrEmpty(replacedByToken))
                token.ReplacedByToken = replacedByToken;
            await _context.SaveChangesAsync();
        }

        public async Task RotateAsync(RefreshToken existing, RefreshToken newToken)
        {
            existing.Revoked = true;
            existing.ReplacedByToken = newToken.Token;
            _context.RefreshTokens.Add(newToken);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<RefreshToken>> GetActiveTokensForUserAsync(long userId)
        {
            return await _context.RefreshTokens
                .Where(r => r.UserId == userId && !r.Revoked && r.ExpiresAt > DateTime.Now)
                .ToListAsync();
        }
    }
}
