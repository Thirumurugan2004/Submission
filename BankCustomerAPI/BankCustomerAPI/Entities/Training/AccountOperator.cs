using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("accountoperators", Schema = "training")]
    public class AccountOperator
    {
        [Key]
        [Column("accountid", Order = 0)]
        public long AccountId { get; set; }

        [Key]
        [Column("operatoruserid", Order = 1)]
        public long OperatorUserId { get; set; }

        // ⭐ NOT MAPPED → DOES NOT TOUCH DB
        [Column("addedon")]
        public DateTime AddedOn { get; set; } = DateTime.Now;

        public Account Account { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}
