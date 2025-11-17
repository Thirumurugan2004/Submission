using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("refreshtokens", Schema = "training")]
    public class RefreshToken
    {
        [Key]
        [Column("tokenid")]
        public long TokenId { get; set; }

        [Column("userid")]
        public long UserId { get; set; }

        [Column("token")]
        [MaxLength(500)]
        public string Token { get; set; } = string.Empty;

        [Column("createdat")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("expiresat")]
        public DateTime ExpiresAt { get; set; }

        // boolean flag used everywhere in services/controllers
        [Column("revoked")]
        public bool Revoked { get; set; } = false;

        // optional token that replaced this one
        [Column("replacedbytoken")]
        [MaxLength(500)]
        public string? ReplacedByToken { get; set; }

        public User User { get; set; } = null!;
    }
}
