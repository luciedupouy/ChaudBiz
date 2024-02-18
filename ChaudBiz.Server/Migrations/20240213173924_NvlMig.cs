using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class NvlMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NomChantier",
                table: "Chantiers");

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Utilisateurs",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "MaterielChantierId",
                table: "Materiels",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Chantiers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "MaterielChantiers",
                columns: table => new
                {
                    MaterielChantierId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TypeC = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterielChantiers", x => x.MaterielChantierId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Materiels_MaterielChantierId",
                table: "Materiels",
                column: "MaterielChantierId");

            migrationBuilder.AddForeignKey(
                name: "FK_Materiels_MaterielChantiers_MaterielChantierId",
                table: "Materiels",
                column: "MaterielChantierId",
                principalTable: "MaterielChantiers",
                principalColumn: "MaterielChantierId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materiels_MaterielChantiers_MaterielChantierId",
                table: "Materiels");

            migrationBuilder.DropTable(
                name: "MaterielChantiers");

            migrationBuilder.DropIndex(
                name: "IX_Materiels_MaterielChantierId",
                table: "Materiels");

            migrationBuilder.DropColumn(
                name: "MaterielChantierId",
                table: "Materiels");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Chantiers");

            migrationBuilder.AlterColumn<int>(
                name: "Role",
                table: "Utilisateurs",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "NomChantier",
                table: "Chantiers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
