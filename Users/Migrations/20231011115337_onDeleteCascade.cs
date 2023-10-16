using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Users.Migrations
{
    /// <inheritdoc />
    public partial class onDeleteCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {


            migrationBuilder.AddForeignKey(
              name: "FK_UserRoles_Roles_RoleId",
              table: "UserRoles",
              column: "RoleId",
              principalTable: "Roles",
              principalColumn: "Id",
              onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");


        }
    }
}
