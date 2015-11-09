using System.Collections.Generic;
using Microsoft.Data.Entity.Relational.Migrations;
using Microsoft.Data.Entity.Relational.Migrations.Builders;
using Microsoft.Data.Entity.Relational.Migrations.Operations;

namespace Pickle.Data.EntityFramework.Migrations
{
    public partial class InitialMigration : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.CreateSequence(
                name: "DefaultSequence",
                type: "bigint",
                startWith: 1L,
                incrementBy: 10);
            migration.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column(type: "nvarchar(450)", nullable: false),
                    ChannelId = table.Column(type: "nvarchar(max)", nullable: true),
                    Message = table.Column(type: "nvarchar(max)", nullable: true),
                    Username = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatMessageDataModel", x => x.Id);
                });
            migration.CreateTable(
                name: "Hubs",
                columns: table => new
                {
                    Id = table.Column(type: "nvarchar(450)", nullable: false),
                    Name = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HubDataModel", x => x.Id);
                });
            migration.CreateTable(
                name: "Channels",
                columns: table => new
                {
                    Id = table.Column(type: "nvarchar(450)", nullable: false),
                    HubDataModelId = table.Column(type: "nvarchar(450)", nullable: true),
                    HubId = table.Column(type: "nvarchar(max)", nullable: true),
                    Name = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChannelDataModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChannelDataModel_HubDataModel_HubDataModelId",
                        columns: x => x.HubDataModelId,
                        referencedTable: "Hubs",
                        referencedColumn: "Id");
                });
        }
        
        public override void Down(MigrationBuilder migration)
        {
            migration.DropSequence("DefaultSequence");
            migration.DropTable("Channels");
            migration.DropTable("Messages");
            migration.DropTable("Hubs");
        }
    }
}
