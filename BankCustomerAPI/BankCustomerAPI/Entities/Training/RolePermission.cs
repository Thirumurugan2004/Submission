using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("rolepermissions", Schema = "training")]
    public class RolePermission
    {
        [Key, Column("roleid", Order = 0)]
        [ForeignKey("Role")]
        public int RoleId { get; set; }

        [Key, Column("permissionid", Order = 1)]
        [ForeignKey("Permission")]
        public int PermissionId { get; set; }

        [Column("assignedat")]
        public DateTime AssignedAt { get; set; }

        // Navigation properties
        public Role Role { get; set; } = null!;
        public Permission Permission { get; set; } = null!;
    }
}
