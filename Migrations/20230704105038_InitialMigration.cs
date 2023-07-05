using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AccessFailedCount",
                table: "UserAcme",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "UserAcme",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "UserAcme",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailConfirmed",
                table: "UserAcme",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "UserAcme",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LockoutEnabled",
                table: "UserAcme",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LockoutEnd",
                table: "UserAcme",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedEmail",
                table: "UserAcme",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedUserName",
                table: "UserAcme",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "UserAcme",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "UserAcme",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PhoneNumberConfirmed",
                table: "UserAcme",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SecurityStamp",
                table: "UserAcme",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TwoFactorEnabled",
                table: "UserAcme",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccessFailedCount",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "EmailConfirmed",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "LockoutEnabled",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "LockoutEnd",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "NormalizedEmail",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "NormalizedUserName",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "PhoneNumberConfirmed",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "SecurityStamp",
                table: "UserAcme");

            migrationBuilder.DropColumn(
                name: "TwoFactorEnabled",
                table: "UserAcme");
        }
    }
}
