using BankCustomerAPI.Entities.Training;

namespace BankCustomerAPI.Services
{
    public interface ILoginAttemptService
    {
        Task LogAttemptAsync(long? userId, string username, bool success, string? ip, string? userAgent);
        Task<int> CountRecentFailedAsync(long userId, TimeSpan window);
        Task<DateTime?> GetLastFailedAttemptAsync(long userId);
        Task<IEnumerable<LoginAttempt>> GetRecentAttemptsAsync(long userId, TimeSpan window);
    }
}
