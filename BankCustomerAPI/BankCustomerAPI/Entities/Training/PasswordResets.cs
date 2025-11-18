using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("passwordresets", Schema = "training")]
    public class PasswordReset
    {
        [Key]
        [Column("passwordresetid")]
        public long PasswordResetId { get; set; }

        [Column("userid")]
        public long UserId { get; set; }

        [Column("token")]
        public string Token { get; set; } = string.Empty;

        [Column("expiresat")]
        public DateTime ExpiresAt { get; set; }

        [Column("createdat")]
        public DateTime CreatedAt { get; set; }

        [Column("used")]
        public bool Used { get; set; }

        public User User { get; set; } = null!;
    }
}
