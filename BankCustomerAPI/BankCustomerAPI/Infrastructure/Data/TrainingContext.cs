using BankCustomerAPI.Entities.Training;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace BankCustomerAPI.Infrastructure.Data
{
    public class TrainingContext : DbContext
    {
        public TrainingContext(DbContextOptions<TrainingContext> options)
            : base(options)
        {
        }

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

            // === Relationships for Bank, Branch, etc. ===
            // (keep your existing relationships as-is)
            // ----------------------------------------------------------
            modelBuilder.Entity<Branch>()
                .HasOne(b => b.Bank)
                .WithMany(bk => bk.Branches)
                .HasForeignKey(b => b.BankId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Bank)
                .WithMany(b => b.Employees)
                .HasForeignKey(e => e.BankId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Branch)
                .WithMany(b => b.Employees)
                .HasForeignKey(e => e.BranchId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Account>()
                .HasOne(a => a.Branch)
                .WithMany(b => b.Accounts)
                .HasForeignKey(a => a.BranchId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.User)
                .WithOne()
                .HasForeignKey<Employee>(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Account>()
                .HasOne(a => a.User)
                .WithMany(u => u.Accounts)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AccountOperator>()
    .HasOne(ao => ao.Account)
    .WithMany(a => a.AccountOperators) // ✅ correct navigation name
    .HasForeignKey(ao => ao.AccountId)
    .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<AccountOperator>()
                .HasOne(ao => ao.User)
                .WithMany(u => u.AccountOperators)
                .HasForeignKey(ao => ao.OperatorUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Account)
                .WithMany(a => a.Transactions)
                .HasForeignKey(t => t.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.PerformedByUser)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.PerformedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // ==========================================================
            // ✅ SEED DATA (Roles, Users, UserRoles)
            // ==========================================================
            string Hash(string password) =>
                Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(password)));

            // --- Roles ---
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleId = 1, RoleName = "Admin", Description = "Full access", CreatedAt = DateTime.Now },
                new Role { RoleId = 2, RoleName = "User", Description = "Limited access", CreatedAt = DateTime.Now },
                new Role { RoleId = 3, RoleName = "Viewer", Description = "Read-only", CreatedAt = DateTime.Now }
            );

            // --- Users ---
            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, FullName = "Super Admin", Email = "admin@bank.com", PasswordHash = Hash("admin123"), IsActive = true, CreatedAt = DateTime.Now },
                new User { UserId = 2, FullName = "Manager User", Email = "manager@bank.com", PasswordHash = Hash("manager123"), IsActive = true, CreatedAt = DateTime.Now },
                new User { UserId = 3, FullName = "Customer User", Email = "customer@bank.com", PasswordHash = Hash("customer123"), IsActive = true, CreatedAt = DateTime.Now },
                new User { UserId = 4, FullName = "Guest User", Email = "guest@bank.com", PasswordHash = Hash("guest123"), IsActive = true, CreatedAt = DateTime.Now }
            );

            // --- UserRoles ---
            modelBuilder.Entity<UserRole>().HasData(
                new UserRole { UserId = 1, RoleId = 1, AssignedAt = DateTime.Now }, // SuperAdmin → Admin
                new UserRole { UserId = 1, RoleId = 2, AssignedAt = DateTime.Now }, // SuperAdmin → User
                new UserRole { UserId = 1, RoleId = 3, AssignedAt = DateTime.Now }, // SuperAdmin -> viewer
                new UserRole { UserId = 2, RoleId = 1, AssignedAt = DateTime.Now }, // Manager → Admin
                new UserRole { UserId = 3, RoleId = 2, AssignedAt = DateTime.Now }, // Customer → User
                new UserRole { UserId = 4, RoleId = 3, AssignedAt = DateTime.Now }  // Guest → Viewer
            );
        }
    }
}
