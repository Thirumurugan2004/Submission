using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("accounts", Schema = "training")]
    public class Account
    {
        [Key]
        [Column("accountid")]
        public long AccountId { get; set; }

        [ForeignKey("User")]
        [Column("userid")]
        public long UserId { get; set; }

        [ForeignKey("Branch")]
        [Column("branchid")]
        public int BranchId { get; set; }

        [Required, MaxLength(20)]
        [Column("accounttype")]
        public string AccountType { get; set; } = null!;

        [Required, StringLength(14)]
        [Column("accountnumber")]
        public string AccountNumber { get; set; } = null!;

        [Required, StringLength(3)]
        [Column("currencycode")]
        public string CurrencyCode { get; set; } = "INR";

        [Column("balance", TypeName = "decimal(18,2)")]
        public decimal Balance { get; set; }

        [Column("interestrate", TypeName = "decimal(5,2)")]
        public decimal? InterestRate { get; set; }

        [Column("isactive")]
        public bool IsActive { get; set; }

        [Column("openedon")]
        public DateTime OpenedOn { get; set; }

        [Column("closedon")]
        public DateTime? ClosedOn { get; set; }

        public User User { get; set; } = null!;
        public Branch Branch { get; set; } = null!;
        public ICollection<AccountOperator> Operators { get; set; } = new List<AccountOperator>();
        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
        public object AccountOperators { get; internal set; }
    }
}
