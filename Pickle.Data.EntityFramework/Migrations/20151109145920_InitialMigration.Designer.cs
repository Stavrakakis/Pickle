using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Relational.Migrations.Infrastructure;
using Pickle.Data.EntityFramework.Context;

namespace Pickle.Data.EntityFramework.Migrations
{
    [ContextType(typeof(PickleContext))]
    partial class InitialMigration
    {
        public override string Id
        {
            get { return "20151109145920_InitialMigration"; }
        }
        
        public override string ProductVersion
        {
            get { return "7.0.0-beta5-13549"; }
        }
        
        public override void BuildTargetModel(ModelBuilder builder)
        {
            builder
                .Annotation("SqlServer:DefaultSequenceName", "DefaultSequence")
                .Annotation("SqlServer:Sequence:.DefaultSequence", "'DefaultSequence', '', '1', '10', '', '', 'Int64', 'False'")
                .Annotation("SqlServer:ValueGeneration", "Sequence");
            
            builder.Entity("Pickle.Data.DataModels.ChannelDataModel", b =>
                {
                    b.Property<string>("Id")
                        .GenerateValueOnAdd();
                    
                    b.Property<string>("HubDataModelId");
                    
                    b.Property<string>("HubId");
                    
                    b.Property<string>("Name");
                    
                    b.Key("Id");
                    
                    b.Annotation("Relational:TableName", "Channels");
                });
            
            builder.Entity("Pickle.Data.DataModels.ChatMessageDataModel", b =>
                {
                    b.Property<string>("Id")
                        .GenerateValueOnAdd();
                    
                    b.Property<string>("ChannelId");
                    
                    b.Property<string>("Message");
                    
                    b.Property<string>("Username");
                    
                    b.Key("Id");
                    
                    b.Annotation("Relational:TableName", "Messages");
                });
            
            builder.Entity("Pickle.Data.DataModels.HubDataModel", b =>
                {
                    b.Property<string>("Id")
                        .GenerateValueOnAdd();
                    
                    b.Property<string>("Name");
                    
                    b.Key("Id");
                    
                    b.Annotation("Relational:TableName", "Hubs");
                });
            
            builder.Entity("Pickle.Data.DataModels.ChannelDataModel", b =>
                {
                    b.Reference("Pickle.Data.DataModels.HubDataModel")
                        .InverseCollection()
                        .ForeignKey("HubDataModelId");
                });
        }
    }
}
