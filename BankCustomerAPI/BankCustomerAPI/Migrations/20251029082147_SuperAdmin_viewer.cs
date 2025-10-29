using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankCustomerAPI.Migrations
{
    /// <inheritdoc />
    public partial class SuperAdmin_viewer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                schema: "training",
                table: "roles",
                keyColumn: "roleid",
                keyValue: 1,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(843));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "roles",
                keyColumn: "roleid",
                keyValue: 2,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(858));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "roles",
                keyColumn: "roleid",
                keyValue: 3,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(861));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 1, 1L },
                column: "assignedat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(1295));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 2, 1L },
                column: "assignedat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(1298));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 1, 2L },
                column: "assignedat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(1302));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 2, 3L },
                column: "assignedat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(1303));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 3, 4L },
                column: "assignedat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(1305));

            migrationBuilder.InsertData(
                schema: "training",
                table: "userroles",
                columns: new[] { "roleid", "userid", "assignedat" },
                values: new object[] { 3, 1L, new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(1300) });

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 1L,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(1205));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 2L,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(1226));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 3L,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(1239));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 4L,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(1253));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 3, 1L });

            migrationBuilder.UpdateData(
                schema: "training",
                table: "roles",
                keyColumn: "roleid",
                keyValue: 1,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(7743));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "roles",
                keyColumn: "roleid",
                keyValue: 2,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(7754));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "roles",
                keyColumn: "roleid",
                keyValue: 3,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(7756));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 1, 1L },
                column: "assignedat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8125));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 2, 1L },
                column: "assignedat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8126));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 1, 2L },
                column: "assignedat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8128));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 2, 3L },
                column: "assignedat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8128));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 3, 4L },
                column: "assignedat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8129));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 1L,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8071));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 2L,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8083));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 3L,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8091));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 4L,
                column: "createdat",
                value: new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8099));
        }
    }
}
