using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Geolocalizaciones.Migrations
{
    /// <inheritdoc />
    public partial class capacity : Migration
    {
        // <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "MeetingRoom",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "MeetingRoom");
        }
    }
}
