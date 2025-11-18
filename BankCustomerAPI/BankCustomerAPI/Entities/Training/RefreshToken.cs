using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("refreshtokens", Schema = "training")]
    public class RefreshToken
    {
        [Key]
        [Column("refreshtokenid")]
        public long RefreshTokenId { get; set; }

        [Column("userid")]
        public long UserId { get; set; }

        [Column("token")]
        public string Token { get; set; } = string.Empty;

        [Column("expiresat")]
        public DateTime ExpiresAt { get; set; }

        [Column("createdat")]
        public DateTime CreatedAt { get; set; }

        [Column("revoked")]
        public bool Revoked { get; set; }

        [Column("replacedbytoken")]
        public string? ReplacedByToken { get; set; }

        public User User { get; set; } = null!;
    }
}
