using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Thalamo.Gsp.Emoc.Services.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMocRequestSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlantArea",
                table: "MoCRequests",
                newName: "Location");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "MoCRequests",
                newName: "ScopeJson");

            migrationBuilder.RenameColumn(
                name: "ChangeType",
                table: "MoCRequests",
                newName: "Urgency");

            migrationBuilder.AddColumn<string>(
                name: "AssetsAffected",
                table: "MoCRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Benefits",
                table: "MoCRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "MoCRequests",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Detail",
                table: "MoCRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InitiatorDepartment",
                table: "MoCRequests",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InitiatorDivision",
                table: "MoCRequests",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NotificationNumber",
                table: "MoCRequests",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlantChangeType",
                table: "MoCRequests",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "MoCRequests",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetsAffected",
                table: "MoCRequests");

            migrationBuilder.DropColumn(
                name: "Benefits",
                table: "MoCRequests");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "MoCRequests");

            migrationBuilder.DropColumn(
                name: "Detail",
                table: "MoCRequests");

            migrationBuilder.DropColumn(
                name: "InitiatorDepartment",
                table: "MoCRequests");

            migrationBuilder.DropColumn(
                name: "InitiatorDivision",
                table: "MoCRequests");

            migrationBuilder.DropColumn(
                name: "NotificationNumber",
                table: "MoCRequests");

            migrationBuilder.DropColumn(
                name: "PlantChangeType",
                table: "MoCRequests");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "MoCRequests");

            migrationBuilder.RenameColumn(
                name: "Urgency",
                table: "MoCRequests",
                newName: "ChangeType");

            migrationBuilder.RenameColumn(
                name: "ScopeJson",
                table: "MoCRequests",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "MoCRequests",
                newName: "PlantArea");
        }
    }
}
