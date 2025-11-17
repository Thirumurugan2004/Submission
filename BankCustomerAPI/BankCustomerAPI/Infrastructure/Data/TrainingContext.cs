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

        // -------------------- DBSets --------------------
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

        // Security
        public DbSet<RefreshToken> RefreshTokens { get; set; } = null!;
        public DbSet<AuditLog> AuditLogs { get; set; } = null!;
        public DbSet<LoginAttempt> LoginAttempts { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasDefaultSchema("training");

            // -------------------- Composite Keys --------------------
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<RolePermission>()
                .HasKey(rp => new { rp.RoleId, rp.PermissionId });

            // -------------------- Relationships --------------------

            // UserRole → User
            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserRole → Role
            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .OnDelete(DeleteBehavior.Cascade);

            // Branch → Bank
            modelBuilder.Entity<Branch>()
                .HasOne(b => b.Bank)
                .WithMany(bk => bk.Branches)
                .HasForeignKey(b => b.BankId)
                .OnDelete(DeleteBehavior.Restrict);

            // Employee → Bank
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Bank)
                .WithMany(b => b.Employees)
                .HasForeignKey(e => e.BankId)
                .OnDelete(DeleteBehavior.Restrict);

            // Employee → Branch
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Branch)
                .WithMany(b => b.Employees)
                .HasForeignKey(e => e.BranchId)
                .OnDelete(DeleteBehavior.Restrict);

            // Employee → User
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.User)
                .WithOne()
                .HasForeignKey<Employee>(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Account → Branch
            modelBuilder.Entity<Account>()
                .HasOne(a => a.Branch)
                .WithMany(b => b.Accounts)
                .HasForeignKey(a => a.BranchId)
                .OnDelete(DeleteBehavior.Restrict);

            // Account → User
            modelBuilder.Entity<Account>()
                .HasOne(a => a.User)
                .WithMany(u => u.Accounts)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // AccountOperator → Account
            modelBuilder.Entity<AccountOperator>()
                .HasOne(ao => ao.Account)
                .WithMany(a => a.AccountOperators)
                .HasForeignKey(ao => ao.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            // AccountOperator → User
            modelBuilder.Entity<AccountOperator>()
                .HasOne(ao => ao.User)
                .WithMany(u => u.AccountOperators)
                .HasForeignKey(ao => ao.OperatorUserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Transaction → Account
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Account)
                .WithMany(a => a.Transactions)
                .HasForeignKey(t => t.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            // Transaction → PerformedByUser
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.PerformedByUser)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.PerformedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // -------------------- Security Relationships --------------------

            modelBuilder.Entity<RefreshToken>()
    .HasOne(rt => rt.User)
    .WithMany()
    .HasForeignKey(rt => rt.UserId)
    .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<LoginAttempt>()
     .HasOne(la => la.User)
     .WithMany()
     .HasForeignKey(la => la.UserId)
     .OnDelete(DeleteBehavior.SetNull);

            //modelBuilder.Entity<RefreshToken>()
            //    .HasOne(rt => rt.User)
            //    .WithMany()
            //    .HasForeignKey(rt => rt.UserId)
            //    .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AuditLog>()
                .HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            //modelBuilder.Entity<LoginAttempt>()
            //    .HasOne<User>()
            //    .WithMany()
            //    .HasForeignKey(a => a.UserId)
            //    .OnDelete(DeleteBehavior.SetNull);

            // -------------------- Indexes --------------------
            modelBuilder.Entity<RefreshToken>().HasIndex(rt => rt.Token);
            modelBuilder.Entity<RefreshToken>().HasIndex(rt => rt.UserId);
            modelBuilder.Entity<LoginAttempt>().HasIndex(la => la.Email);
            modelBuilder.Entity<LoginAttempt>().HasIndex(la => la.AttemptAt);


            // -------------------- Seed Removed --------------------
            // REMOVE seed to prevent duplicate data issues
        }
    }
}
