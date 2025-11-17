using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("loginattempts", Schema = "training")]
    public class LoginAttempt
    {
        [Key]
        [Column("attemptid")]
        public long AttemptId { get; set; }

        [Column("userid")]
        public long? UserId { get; set; }   // null for unknown user logins

        // store attempted username / email
        [Column("username")]
        [MaxLength(200)]
        public string? Username { get; set; }

        [Column("email")]
        [MaxLength(200)]
        public string? Email { get; set; }

        [Column("issuccessful")]
        public bool IsSuccessful { get; set; }

        [Column("ipaddress")]
        [MaxLength(100)]
        public string? IpAddress { get; set; }

        [Column("useragent")]
        [MaxLength(1000)]
        public string? UserAgent { get; set; }

        // date/time of attempt (services query on this)
        [Column("attemptat")]
        public DateTime AttemptAt { get; set; } = DateTime.UtcNow;

        public User? User { get; set; }
    }
}
