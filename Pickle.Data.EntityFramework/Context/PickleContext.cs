using Microsoft.Data.Entity;
using Pickle.Data.DataModels;

namespace Pickle.Data.EntityFramework.Context
{
    public class PickleContext : DbContext
    {
        public DbSet<HubDataModel> Hubs { get; set; }
        public DbSet<ChannelDataModel> Channels { get; set; }
        public DbSet<ChatMessageDataModel> Messages { get; set; }

        public PickleContext()
        {
            
        }

        protected override void OnConfiguring(EntityOptionsBuilder options)
        {
            options.UseSqlServer(@"Server=(localdb)\v11.0;Database=Pickle;integrated security=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HubDataModel>()
                .Table("Hubs")
                .Key(h => h.Id);

            modelBuilder.Entity<ChannelDataModel>()
                .Table("Channels")
                .Key(h => h.Id);

            modelBuilder.Entity<ChatMessageDataModel>()
                .Table("Messages")
                .Key(h => h.Id);
        }
    }
}
