using FreditorBackend.Models.ArchiveModel;
using FreditorBackend.Models.NoteModel;
using FreditorBackend.Models.TaskModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System.Text.Json;

namespace FreditorBackend.Models.UserModel
{
    /// <summary>
    /// Class <c>DbContext</c> represents a context for database connection.
    /// </summary>
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        /// <summary>
        /// Property <c>FredUser</c> gets and sets users for DbSet.
        /// </summary>
        public DbSet<UserDto> FredUser { get; set; }

        /// <summary>
        /// Property <c>FredTask</c> gets and sets tasks for DbSet.
        /// </summary>
        public DbSet<TaskDto> FredTask { get; set; }

        /// <summary>
        /// Property <c>FredNote</c> gets and sets notes for DbSet.
        /// </summary>
        public DbSet<NoteDto> FredNote { get; set; }

        /// <summary>
        /// Property <c>FredArchive</c> gets and sets archives for DbSet.
        /// </summary>
        public DbSet<ArchiveDto> FredArchive { get; set; }

        public class DatabaseDBContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
        {
            public DatabaseContext CreateDbContext(string[] args)
            {
                var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
                optionsBuilder.UseSqlServer("Data Source=localhost,1433;Initial Catalog=FreditorDB;Persist Security Info=True;User ID=sa;Password=usertest@12;TrustServerCertificate=True");

                return new DatabaseContext(optionsBuilder.Options);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // User build model
            builder.Entity<UserDto>(entity =>
            {
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.UserId).HasColumnName("UserId");
                entity.Property(e => e.UserName).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.Email).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.Password).HasMaxLength(128);
                entity.Property(e => e.Salt).HasMaxLength(128);
            });

            // Task build model
            builder.Entity<TaskDto>(entity =>
            {
                entity.HasKey(e => e.TaskId);
                entity.Property(e => e.TaskId).HasColumnName("TaskId");
                entity.Property(e => e.TaskTitle);
                entity.Property(e => e.TaskElements).HasConversion(v => JsonSerializer.Serialize(v, default), v => JsonSerializer.Deserialize<string[]>(v, default));
                entity.Property(e => e.DeadLine);
            });

            // Note build model
            builder.Entity<NoteDto>(entity => 
            {
                entity.HasKey(e => e.NoteId);
                entity.Property(e => e.NoteId).HasColumnName("NoteId");
                entity.Property(e => e.NoteTitle);
                entity.Property(e => e.NoteContent);
            });

            // Archive build model
            builder.Entity<ArchiveDto>(entity => 
            {
                entity.HasKey(e => e.ArchiveId);
                entity.Property(e => e.ArchiveId).HasColumnName("ArchiveId");
                entity.Property(e => e.ArchiveTaskId);
                entity.Property(e => e.ArchiveNoteId);
            });
        }
    }
}
