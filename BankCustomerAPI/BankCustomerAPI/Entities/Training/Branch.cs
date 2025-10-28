using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("branches", Schema = "training")]
    public class Branch
    {
        [Key]
        [Column("branchid")]
        public int BranchId { get; set; }

        [ForeignKey("Bank")]
        [Column("bankid")]
        public int BankId { get; set; }

        [Required, StringLength(8)]
        [Column("branchcode")]
        public string BranchCode { get; set; } = null!;

        [Required, MaxLength(150)]
        [Column("branchname")]
        public string BranchName { get; set; } = null!;

        [Required, StringLength(11)]
        [Column("ifsccode")]
        public string IFSCCode { get; set; } = null!;

        [MaxLength(500)]
        [Column("address")]
        public string? Address { get; set; }

        [Required, MaxLength(100)]
        [Column("city")]
        public string City { get; set; } = null!;

        [Required, MaxLength(100)]
        [Column("state")]
        public string State { get; set; } = null!;

        [Required, MaxLength(100)]
        [Column("country")]
        public string Country { get; set; } = "India";

        [Column("createdat")]
        public DateTime CreatedAt { get; set; }

        public Bank Bank { get; set; } = null!;
        public ICollection<Account> Accounts { get; set; } = new List<Account>();
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
