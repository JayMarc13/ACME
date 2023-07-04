using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserAcme",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UsesLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserPassword = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAcme", x => x.UserId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reserve_UserId",
                table: "Reserve",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reserve_UserAcme_UserId",
                table: "Reserve",
                column: "UserId",
                principalTable: "UserAcme",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reserve_UserAcme_UserId",
                table: "Reserve");

            migrationBuilder.DropTable(
                name: "UserAcme");

            migrationBuilder.DropIndex(
                name: "IX_Reserve_UserId",
                table: "Reserve");
        }
    }
}
