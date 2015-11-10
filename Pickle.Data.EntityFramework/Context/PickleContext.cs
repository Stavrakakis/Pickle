using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Pickle.Data.DataModels;

namespace Pickle.Data.EntityFramework.Context
{
    public class PickleContext : DbContext
    {
        public virtual DbSet<HubDataModel> Hubs { get; set; }
        public virtual DbSet<ChannelDataModel> Channels { get; set; }
        public virtual DbSet<ChatMessageDataModel> Messages { get; set; }

        public PickleContext()
        {
            
        }

        public PickleContext(DbContextOptions options) : base(options)
        {
         
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HubDataModel>()
                .ToTable("Hubs")
                .HasKey(h => h.Id);

            modelBuilder.Entity<ChannelDataModel>()
                .ToTable("Channels")
                .HasKey(h => h.Id);

            modelBuilder.Entity<ChatMessageDataModel>()
                .ToTable("Messages")
                .HasKey(h => h.Id);
        }
    }
}
