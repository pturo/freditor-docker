using FreditorBackend.Models.TaskModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;

namespace FreditorBackend.Models.UserModel
{
    /// <summary>
    /// Class <c>DbContext</c> represents a context for database connection.
    /// </summary>
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options)
        {

        }

        /// <summary>
        /// Property <c>User</c> gets and sets users for DbSet.
        /// </summary>
        public DbSet<UserDto> FredUser { get; set; }

        /// <summary>
        /// Property <c>Task</c> gets and sets tasks for DbSet.
        /// </summary>
        public DbSet<TaskDto> FredTask { get; set; }

        public class DatabaseDBContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
        {
            public DatabaseContext CreateDbContext(string[] args)
            {
                var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
                //optionsBuilder.UseSqlServer("Server=LAPTOP-QPO93J9C\\SQLEXPRESS;Database=FreditorDB;Trusted_Connection=True;MultipleActiveResultSets=True;");
                optionsBuilder.UseSqlServer("Server=PL-TUTONP-1\\SQLEXPRESS;Database=FreditorDB;User=sa;Password=usertest@12;Trusted_Connection=True;MultipleActiveResultSets=True;");

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
        }
    }
}
