using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("accountoperators", Schema = "training")]
    public class AccountOperator
    {
        [Column("accountid")]
        public long AccountId { get; set; }

        [Column("operatoruserid")]
        public long OperatorUserId { get; set; }

        [Column("addedon")]
        public DateTime AddedOn { get; set; } = DateTime.Now;

        public Account Account { get; set; } = null!;
        public User User { get; set; } = null!;
    }

}
