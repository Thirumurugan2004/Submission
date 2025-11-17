using BankCustomerAPI.Entities.Training;
using BankCustomerAPI.Infrastructure.Data;

namespace BankCustomerAPI.Services
{
    public class AuditLogService : IAuditLogService
    {
        private readonly TrainingContext _context;

        public AuditLogService(TrainingContext context)
        {
            _context = context;
        }

        public async Task LogAsync(long? userId, string action, string? details = null)
        {
            var a = new AuditLog
            {
                UserId = userId,
                Action = action,
                Details = details,
                CreatedAt = DateTime.Now
            };
            _context.AuditLogs.Add(a);
            await _context.SaveChangesAsync();
        }
    }
}
