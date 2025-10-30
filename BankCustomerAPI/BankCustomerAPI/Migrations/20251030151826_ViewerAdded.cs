using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankCustomerAPI.Migrations
{
    /// <inheritdoc />
    public partial class ViewerAdded : Migration
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
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(979));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "roles",
                keyColumn: "roleid",
                keyValue: 2,
                column: "createdat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1041));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "roles",
                keyColumn: "roleid",
                keyValue: 3,
                column: "createdat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1042));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 1, 1L },
                column: "assignedat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1535));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 2, 1L },
                column: "assignedat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1537));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 3, 1L },
                column: "assignedat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1538));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 1, 2L },
                column: "assignedat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1539));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 2, 3L },
                column: "assignedat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1540));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 3, 4L },
                column: "assignedat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1541));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 1L,
                column: "createdat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1423));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 2L,
                column: "createdat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1479));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 3L,
                column: "createdat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1489));

            migrationBuilder.UpdateData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 4L,
                column: "createdat",
                value: new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1497));

            migrationBuilder.InsertData(
                schema: "training",
                table: "users",
                columns: new[] { "userid", "createdat", "dateofbirth", "email", "fullname", "isactive", "isminor", "passwordhash", "phonenumber", "salt", "updatedat" },
                values: new object[] { 5L, new DateTime(2025, 10, 30, 20, 48, 26, 112, DateTimeKind.Local).AddTicks(1504), null, "guest1@bank.com", "Guest User1", true, false, "a5PMukFKwdCuHnfz+sVgx0imcB7WlGc1pJ1GM1FRjhY=", null, null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 5L);

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
                keyValues: new object[] { 3, 1L },
                column: "assignedat",
                value: new DateTime(2025, 10, 29, 13, 51, 46, 490, DateTimeKind.Local).AddTicks(1300));

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
    }
}
