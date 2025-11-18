using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("loginattempts", Schema = "training")]
    public class LoginAttempt
    {
        [Key]
        [Column("loginattemptid")]
        public long LoginAttemptId { get; set; }

        [Column("userid")]
        public long? UserId { get; set; }

        [Column("username")]
        public string Username { get; set; } = string.Empty;

        [Column("attemptat")]
        public DateTime AttemptAt { get; set; }

        [Column("issuccessful")]
        public bool IsSuccessful { get; set; }

        [Column("ipaddress")]
        public string? IpAddress { get; set; }

        [Column("useragent")]
        public string? UserAgent { get; set; }

        public User? User { get; set; }
    }
}
