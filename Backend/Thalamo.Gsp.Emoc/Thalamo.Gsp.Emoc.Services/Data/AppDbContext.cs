using Microsoft.EntityFrameworkCore;
using Thalamo.Gsp.Emoc.Services.Models;

namespace Thalamo.Gsp.Emoc.Services.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<MoCRequest> MoCRequests { get; set; }
        public DbSet<Approval> Approvals { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships if needed beyond conventions
            modelBuilder.Entity<MoCRequest>()
                .HasMany(m => m.Approvals)
                .WithOne(a => a.MocRequest)
                .HasForeignKey(a => a.MocRequestId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MoCRequest>()
                .HasMany(m => m.Attachments)
                .WithOne(a => a.MocRequest)
                .HasForeignKey(a => a.MocRequestId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MoCRequest>()
                .HasMany(m => m.AuditLogs)
                .WithOne(a => a.MocRequest)
                .HasForeignKey(a => a.MocRequestId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
