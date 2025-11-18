using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Services
{
    public class LoginAttemptService : ILoginAttemptService
    {
        private readonly TrainingContext _context;

        public LoginAttemptService(TrainingContext context)
        {
            _context = context;
        }

        public async Task LogAttemptAsync(long? userId, string username, bool success, string ip, string userAgent)
        {
            var attempt = new LoginAttempt
            {
                UserId = userId,
                Username = username,
                IsSuccessful = success,
                IpAddress = ip,
                UserAgent = userAgent,
                AttemptAt = DateTime.Now
            };

            _context.LoginAttempts.Add(attempt);
            await _context.SaveChangesAsync();
        }

        public async Task<int> CountRecentFailedAsync(long userId, TimeSpan window)
        {
            var since = DateTime.Now - window;

            return await _context.LoginAttempts
                .Where(l => l.UserId == userId &&
                            !l.IsSuccessful &&
                            l.AttemptAt >= since)
                .CountAsync();
        }

        public async Task<DateTime?> GetLastFailedAttemptAsync(long userId)
        {
            return await _context.LoginAttempts
                .Where(l => l.UserId == userId && !l.IsSuccessful)
                .OrderByDescending(l => l.AttemptAt)
                .Select(l => l.AttemptAt)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<LoginAttempt>> GetRecentAttemptsAsync(long userId, TimeSpan window)
        {
            var since = DateTime.Now - window;

            return await _context.LoginAttempts
                .Where(l => l.UserId == userId &&
                            l.AttemptAt >= since)
                .ToListAsync();
        }
    }
}
