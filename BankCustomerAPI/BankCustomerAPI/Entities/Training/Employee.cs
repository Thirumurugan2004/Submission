using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("employees", Schema = "training")]
    public class Employee
    {
        [Key]
        [Column("employeeid")]
        public long EmployeeId { get; set; }

        [ForeignKey("Bank")]
        [Column("bankid")]
        public int BankId { get; set; }

        [ForeignKey("Branch")]
        [Column("branchid")]
        public int BranchId { get; set; }

        [ForeignKey("User")]
        [Column("userid")]
        public long UserId { get; set; }

        [Required, StringLength(10)]
        [Column("employeecode")]
        public string EmployeeCode { get; set; } = null!;

        [Required, MaxLength(100)]
        [Column("designation")]
        public string Designation { get; set; } = null!;

        [Column("hiredate")]
        public DateTime HireDate { get; set; }

        [Column("isactive")]
        public bool IsActive { get; set; }

        [Column("createdat")]
        public DateTime CreatedAt { get; set; }

        [Column("updatedat")]
        public DateTime? UpdatedAt { get; set; }

        public Bank Bank { get; set; } = null!;
        public Branch Branch { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}
