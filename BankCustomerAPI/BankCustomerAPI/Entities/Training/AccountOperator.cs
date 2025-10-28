using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("accountoperators", Schema = "training")]
    public class AccountOperator
    {
        [Key]
        [Column("operatorid")]
        public long OperatorId { get; set; }

        [ForeignKey("Account")]
        [Column("accountid")]
        public long AccountId { get; set; }

        [ForeignKey("User")]
        [Column("operatoruserid")]
        public long OperatorUserId { get; set; }

        [Required, MaxLength(30)]
        [Column("operatortype")]
        public string OperatorType { get; set; } = null!;

        [Column("startdate")]
        public DateTime StartDate { get; set; }

        [Column("enddate")]
        public DateTime? EndDate { get; set; }

        public Account Account { get; set; } = null!;
        public User User { get; set; } = null!;
        public object OperatorUser { get; internal set; }
    }
}
