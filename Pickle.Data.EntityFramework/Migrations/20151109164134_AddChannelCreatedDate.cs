using System.Collections.Generic;
using Microsoft.Data.Entity.Relational.Migrations;
using Microsoft.Data.Entity.Relational.Migrations.Builders;
using Microsoft.Data.Entity.Relational.Migrations.Operations;

namespace Pickle.Data.EntityFramework.Migrations
{
    public partial class AddChannelCreatedDate : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.AddColumn(
                name: "CreatedDate",
                table: "Messages",
                type: "datetime2",
                nullable: false);
        }
        
        public override void Down(MigrationBuilder migration)
        {
            migration.DropColumn(name: "CreatedDate", table: "Messages");
        }
    }
}
