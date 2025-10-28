using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("roles", Schema = "training")]
    public class Role
    {
        [Key]
        [Column("roleid")]
        public int RoleId { get; set; }

        [Required, MaxLength(100)]
        [Column("rolename")]
        public string RoleName { get; set; } = null!;

        [MaxLength(500)]
        [Column("description")]
        public string? Description { get; set; }

        [Column("createdat")]
        public DateTime CreatedAt { get; set; }

        [Column("updatedat")]
        public DateTime? UpdatedAt { get; set; }

        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
        public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}
