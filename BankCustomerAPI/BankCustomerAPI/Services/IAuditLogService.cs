using BankCustomerAPI.Entities.Training;

namespace BankCustomerAPI.Services
{
    public interface IAuditLogService
    {
        Task LogAsync(long? userId, string action, string? details = null);
    }
}
