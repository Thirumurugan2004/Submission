using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("transactions", Schema = "training")]
    public class Transaction
    {
        [Key]
        [Column("transactionid")]
        public long TransactionId { get; set; }

        [ForeignKey("Account")]
        [Column("accountid")]
        public long AccountId { get; set; }

        [Required, MaxLength(20)]
        [Column("transactiontype")]
        public string TransactionType { get; set; } = null!;

        [Column("amount", TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Column("transactiondate")]
        public DateTime TransactionDate { get; set; }

        [ForeignKey("PerformedByUser")]
        [Column("performedby")]
        public long PerformedBy { get; set; }

        [MaxLength(500)]
        [Column("remarks")]
        public string? Remarks { get; set; }

        [Required, StringLength(16)]
        [Column("referencenumber")]
        public string ReferenceNumber { get; set; } = null!;

        public Account Account { get; set; } = null!;
        public User PerformedByUser { get; set; } = null!;
    }
}
