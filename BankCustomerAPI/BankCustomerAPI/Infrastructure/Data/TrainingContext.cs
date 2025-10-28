using BankCustomerAPI.Entities.Training;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Infrastructure.Data
{
    public class TrainingContext : DbContext
    {
        public TrainingContext(DbContextOptions<TrainingContext> options)
            : base(options)
        {
        }

        // =======================
        // DbSets for all entities
        // =======================
        public DbSet<Role> Roles { get; set; } = null!;
        public DbSet<Permission> Permissions { get; set; } = null!;
        public DbSet<RolePermission> RolePermissions { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<UserRole> UserRoles { get; set; } = null!;
        public DbSet<Bank> Banks { get; set; } = null!;
        public DbSet<Branch> Branches { get; set; } = null!;
        public DbSet<Employee> Employees { get; set; } = null!;
        public DbSet<Account> Accounts { get; set; } = null!;
        public DbSet<AccountOperator> AccountOperators { get; set; } = null!;
        public DbSet<Transaction> Transactions { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ✅ Default Schema
            modelBuilder.HasDefaultSchema("training");

            // =======================
            // Composite Keys
            // =======================
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<RolePermission>()
                .HasKey(rp => new { rp.RoleId, rp.PermissionId });

            // =======================
            // Relationships
            // =======================

            // Role - UserRole (1:M)
            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .OnDelete(DeleteBehavior.Cascade);

            // Role - RolePermission (1:M)
            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Role)
                .WithMany(r => r.RolePermissions)
                .HasForeignKey(rp => rp.RoleId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Permission)
                .WithMany(p => p.RolePermissions)
                .HasForeignKey(rp => rp.PermissionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Bank - Branch (1:M)
            modelBuilder.Entity<Branch>()
                .HasOne(b => b.Bank)
                .WithMany(bk => bk.Branches)
                .HasForeignKey(b => b.BankId)
                .OnDelete(DeleteBehavior.Restrict);

            // Bank - Employee (1:M)
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Bank)
                .WithMany(b => b.Employees)
                .HasForeignKey(e => e.BankId)
                .OnDelete(DeleteBehavior.Restrict);

            // Branch - Employee (1:M)
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Branch)
                .WithMany(b => b.Employees)
                .HasForeignKey(e => e.BranchId)
                .OnDelete(DeleteBehavior.Restrict);

            // Branch - Account (1:M)
            modelBuilder.Entity<Account>()
                .HasOne(a => a.Branch)
                .WithMany(b => b.Accounts)
                .HasForeignKey(a => a.BranchId)
                .OnDelete(DeleteBehavior.Restrict);

            // User - Employee (1:1)
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.User)
                .WithOne()
                .HasForeignKey<Employee>(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // User - Account (1:M)
            modelBuilder.Entity<Account>()
                .HasOne(a => a.User)
                .WithMany(u => u.Accounts)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Account - AccountOperator (1:M)
            modelBuilder.Entity<AccountOperator>()
                .HasOne(ao => ao.Account)
                .WithMany(a => a.Operators)
                .HasForeignKey(ao => ao.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            // User - AccountOperator (1:M)
            modelBuilder.Entity<AccountOperator>()
                .HasOne(ao => ao.User)
                .WithMany(u => u.AccountOperators)
                .HasForeignKey(ao => ao.OperatorUserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Account - Transaction (1:M)
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Account)
                .WithMany(a => a.Transactions)
                .HasForeignKey(t => t.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            // User - Transaction (PerformedBy) (1:M)
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.PerformedByUser)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.PerformedBy)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
