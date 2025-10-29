using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BankCustomerAPI.Migrations
{
    /// <inheritdoc />
    public partial class Dataseeded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                schema: "training",
                table: "roles",
                columns: new[] { "roleid", "createdat", "description", "rolename", "updatedat" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(7743), "Full access", "Admin", null },
                    { 2, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(7754), "Limited access", "User", null },
                    { 3, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(7756), "Read-only", "Viewer", null }
                });

            migrationBuilder.InsertData(
                schema: "training",
                table: "users",
                columns: new[] { "userid", "createdat", "dateofbirth", "email", "fullname", "isactive", "isminor", "passwordhash", "phonenumber", "salt", "updatedat" },
                values: new object[,]
                {
                    { 1L, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8071), null, "admin@bank.com", "Super Admin", true, false, "JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk=", null, null, null },
                    { 2L, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8083), null, "manager@bank.com", "Manager User", true, false, "hmSFeWz6jXwM9xEWQCBbgwdkM1R1d1EdgfgDCumezqU=", null, null, null },
                    { 3L, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8091), null, "customer@bank.com", "Customer User", true, false, "sEHArrNbsPpKpmjKWpILWQGW/a+aAOuFLJt/TRI8xtY=", null, null, null },
                    { 4L, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8099), null, "guest@bank.com", "Guest User", true, false, "a5PMukFKwdCuHnfz+sVgx0imcB7WlGc1pJ1GM1FRjhY=", null, null, null }
                });

            migrationBuilder.InsertData(
                schema: "training",
                table: "userroles",
                columns: new[] { "roleid", "userid", "assignedat" },
                values: new object[,]
                {
                    { 1, 1L, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8125) },
                    { 2, 1L, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8126) },
                    { 1, 2L, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8128) },
                    { 2, 3L, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8128) },
                    { 3, 4L, new DateTime(2025, 10, 29, 12, 29, 30, 178, DateTimeKind.Local).AddTicks(8129) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 1, 1L });

            migrationBuilder.DeleteData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 2, 1L });

            migrationBuilder.DeleteData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 1, 2L });

            migrationBuilder.DeleteData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 2, 3L });

            migrationBuilder.DeleteData(
                schema: "training",
                table: "userroles",
                keyColumns: new[] { "roleid", "userid" },
                keyValues: new object[] { 3, 4L });

            migrationBuilder.DeleteData(
                schema: "training",
                table: "roles",
                keyColumn: "roleid",
                keyValue: 1);

            migrationBuilder.DeleteData(
                schema: "training",
                table: "roles",
                keyColumn: "roleid",
                keyValue: 2);

            migrationBuilder.DeleteData(
                schema: "training",
                table: "roles",
                keyColumn: "roleid",
                keyValue: 3);

            migrationBuilder.DeleteData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                schema: "training",
                table: "users",
                keyColumn: "userid",
                keyValue: 4L);
        }
    }
}
