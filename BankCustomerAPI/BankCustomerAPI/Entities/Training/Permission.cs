using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("permissions", Schema = "training")]
    public class Permission
    {
        [Key]
        [Column("permissionid")]
        public int PermissionId { get; set; }

        [Required, MaxLength(100)]
        [Column("permissionname")]
        public string PermissionName { get; set; } = null!;

        [MaxLength(500)]
        [Column("description")]
        public string? Description { get; set; }

        [Column("createdat")]
        public DateTime CreatedAt { get; set; }

        [Column("updatedat")]
        public DateTime? UpdatedAt { get; set; }

        public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}
