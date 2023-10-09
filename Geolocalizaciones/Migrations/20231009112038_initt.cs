using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Geolocalizaciones.Migrations
{
    /// <inheritdoc />
    public partial class initt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CountryNameeasdfas",
                table: "Country",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountryNameeasdfas",
                table: "Country");
        }
    }
}
