using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("auditlogs", Schema = "training")]
    public class AuditLog
    {
        [Key]
        [Column("logid")]
        public long LogId { get; set; }

        [Column("userid")]
        public long? UserId { get; set; }

        [Column("action")]
        [MaxLength(200)]
        public string Action { get; set; } = string.Empty;

        [Column("createdat")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("ipaddress")]
        [MaxLength(100)]
        public string? IpAddress { get; set; }

        [Column("useragent")]
        [MaxLength(1000)]
        public string? UserAgent { get; set; }

        [Column("details")]
        public string? Details { get; set; }

        public User? User { get; set; }
    }
}
