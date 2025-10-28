using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("users", Schema = "training")]
    public class User
    {
        [Key]
        [Column("userid")]
        public long UserId { get; set; }

        [Required, MaxLength(200)]
        [Column("fullname")]
        public string FullName { get; set; } = null!;

        [Required, MaxLength(200)]
        [Column("email")]
        public string Email { get; set; } = null!;

        [MaxLength(15)]
        [Column("phonenumber")]
        public string? PhoneNumber { get; set; }

        [Required, MaxLength(500)]
        [Column("passwordhash")]
        public string PasswordHash { get; set; } = null!;

        [MaxLength(200)]
        [Column("salt")]
        public string? Salt { get; set; }

        [Column("dateofbirth")]
        public DateTime? DateOfBirth { get; set; }

        [Column("isminor")]
        public bool IsMinor { get; set; }

        [Column("isactive")]
        public bool IsActive { get; set; }

        [Column("createdat")]
        public DateTime CreatedAt { get; set; }

        [Column("updatedat")]
        public DateTime? UpdatedAt { get; set; }

        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
        public ICollection<Account> Accounts { get; set; } = new List<Account>();
        public ICollection<AccountOperator> AccountOperators { get; set; } = new List<AccountOperator>();
        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
