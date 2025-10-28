using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("userroles", Schema = "training")]
    public class UserRole
    {
        [Key]
        [Column("userid", Order = 0)]
        [ForeignKey(nameof(User))]
        public long UserId { get; set; }

        [Key]
        [Column("roleid", Order = 1)]
        [ForeignKey(nameof(Role))]
        public int RoleId { get; set; }

        [Column("assignedat")]
        public DateTime AssignedAt { get; set; }

        public User User { get; set; } = null!;
        public Role Role { get; set; } = null!;
    }
}
