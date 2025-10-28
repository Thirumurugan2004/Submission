using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities.Training
{
    [Table("banks", Schema = "training")]
    public class Bank
    {
        [Key]
        [Column("bankid")]
        public int BankId { get; set; }

        [Required, MaxLength(200)]
        [Column("bankname")]
        public string BankName { get; set; } = null!;

        [MaxLength(500)]
        [Column("headofficeaddress")]
        public string? HeadOfficeAddress { get; set; }

        [Column("establisheddate")]
        public DateTime? EstablishedDate { get; set; }

        [Column("createdat")]
        public DateTime CreatedAt { get; set; }

        public ICollection<Branch> Branches { get; set; } = new List<Branch>();
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
