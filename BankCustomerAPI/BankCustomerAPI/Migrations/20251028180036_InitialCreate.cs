using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankCustomerAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "training");

            migrationBuilder.CreateTable(
                name: "banks",
                schema: "training",
                columns: table => new
                {
                    bankid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    bankname = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    headofficeaddress = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    establisheddate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    createdat = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_banks", x => x.bankid);
                });

            migrationBuilder.CreateTable(
                name: "permissions",
                schema: "training",
                columns: table => new
                {
                    permissionid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    permissionname = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    createdat = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updatedat = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_permissions", x => x.permissionid);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                schema: "training",
                columns: table => new
                {
                    roleid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rolename = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    createdat = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updatedat = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.roleid);
                });

            migrationBuilder.CreateTable(
                name: "users",
                schema: "training",
                columns: table => new
                {
                    userid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fullname = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    email = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    phonenumber = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    passwordhash = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    salt = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    dateofbirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    isminor = table.Column<bool>(type: "bit", nullable: false),
                    isactive = table.Column<bool>(type: "bit", nullable: false),
                    createdat = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updatedat = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.userid);
                });

            migrationBuilder.CreateTable(
                name: "branches",
                schema: "training",
                columns: table => new
                {
                    branchid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    bankid = table.Column<int>(type: "int", nullable: false),
                    branchcode = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    branchname = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    ifsccode = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    city = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    state = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    country = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    createdat = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_branches", x => x.branchid);
                    table.ForeignKey(
                        name: "FK_branches_banks_bankid",
                        column: x => x.bankid,
                        principalSchema: "training",
                        principalTable: "banks",
                        principalColumn: "bankid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "rolepermissions",
                schema: "training",
                columns: table => new
                {
                    roleid = table.Column<int>(type: "int", nullable: false),
                    permissionid = table.Column<int>(type: "int", nullable: false),
                    assignedat = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rolepermissions", x => new { x.roleid, x.permissionid });
                    table.ForeignKey(
                        name: "FK_rolepermissions_permissions_permissionid",
                        column: x => x.permissionid,
                        principalSchema: "training",
                        principalTable: "permissions",
                        principalColumn: "permissionid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_rolepermissions_roles_roleid",
                        column: x => x.roleid,
                        principalSchema: "training",
                        principalTable: "roles",
                        principalColumn: "roleid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "userroles",
                schema: "training",
                columns: table => new
                {
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    roleid = table.Column<int>(type: "int", nullable: false),
                    assignedat = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userroles", x => new { x.userid, x.roleid });
                    table.ForeignKey(
                        name: "FK_userroles_roles_roleid",
                        column: x => x.roleid,
                        principalSchema: "training",
                        principalTable: "roles",
                        principalColumn: "roleid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_userroles_users_userid",
                        column: x => x.userid,
                        principalSchema: "training",
                        principalTable: "users",
                        principalColumn: "userid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "accounts",
                schema: "training",
                columns: table => new
                {
                    accountid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    branchid = table.Column<int>(type: "int", nullable: false),
                    accounttype = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    accountnumber = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: false),
                    currencycode = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    balance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    interestrate = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    isactive = table.Column<bool>(type: "bit", nullable: false),
                    openedon = table.Column<DateTime>(type: "datetime2", nullable: false),
                    closedon = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_accounts", x => x.accountid);
                    table.ForeignKey(
                        name: "FK_accounts_branches_branchid",
                        column: x => x.branchid,
                        principalSchema: "training",
                        principalTable: "branches",
                        principalColumn: "branchid",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_accounts_users_userid",
                        column: x => x.userid,
                        principalSchema: "training",
                        principalTable: "users",
                        principalColumn: "userid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "employees",
                schema: "training",
                columns: table => new
                {
                    employeeid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    bankid = table.Column<int>(type: "int", nullable: false),
                    branchid = table.Column<int>(type: "int", nullable: false),
                    userid = table.Column<long>(type: "bigint", nullable: false),
                    employeecode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    designation = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    hiredate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isactive = table.Column<bool>(type: "bit", nullable: false),
                    createdat = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updatedat = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employees", x => x.employeeid);
                    table.ForeignKey(
                        name: "FK_employees_banks_bankid",
                        column: x => x.bankid,
                        principalSchema: "training",
                        principalTable: "banks",
                        principalColumn: "bankid",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employees_branches_branchid",
                        column: x => x.branchid,
                        principalSchema: "training",
                        principalTable: "branches",
                        principalColumn: "branchid",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employees_users_userid",
                        column: x => x.userid,
                        principalSchema: "training",
                        principalTable: "users",
                        principalColumn: "userid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "accountoperators",
                schema: "training",
                columns: table => new
                {
                    operatorid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    accountid = table.Column<long>(type: "bigint", nullable: false),
                    operatoruserid = table.Column<long>(type: "bigint", nullable: false),
                    operatortype = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    startdate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    enddate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_accountoperators", x => x.operatorid);
                    table.ForeignKey(
                        name: "FK_accountoperators_accounts_accountid",
                        column: x => x.accountid,
                        principalSchema: "training",
                        principalTable: "accounts",
                        principalColumn: "accountid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_accountoperators_users_operatoruserid",
                        column: x => x.operatoruserid,
                        principalSchema: "training",
                        principalTable: "users",
                        principalColumn: "userid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "transactions",
                schema: "training",
                columns: table => new
                {
                    transactionid = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    accountid = table.Column<long>(type: "bigint", nullable: false),
                    transactiontype = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    transactiondate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    performedby = table.Column<long>(type: "bigint", nullable: false),
                    remarks = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    referencenumber = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_transactions", x => x.transactionid);
                    table.ForeignKey(
                        name: "FK_transactions_accounts_accountid",
                        column: x => x.accountid,
                        principalSchema: "training",
                        principalTable: "accounts",
                        principalColumn: "accountid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_transactions_users_performedby",
                        column: x => x.performedby,
                        principalSchema: "training",
                        principalTable: "users",
                        principalColumn: "userid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_accountoperators_accountid",
                schema: "training",
                table: "accountoperators",
                column: "accountid");

            migrationBuilder.CreateIndex(
                name: "IX_accountoperators_operatoruserid",
                schema: "training",
                table: "accountoperators",
                column: "operatoruserid");

            migrationBuilder.CreateIndex(
                name: "IX_accounts_branchid",
                schema: "training",
                table: "accounts",
                column: "branchid");

            migrationBuilder.CreateIndex(
                name: "IX_accounts_userid",
                schema: "training",
                table: "accounts",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "IX_branches_bankid",
                schema: "training",
                table: "branches",
                column: "bankid");

            migrationBuilder.CreateIndex(
                name: "IX_employees_bankid",
                schema: "training",
                table: "employees",
                column: "bankid");

            migrationBuilder.CreateIndex(
                name: "IX_employees_branchid",
                schema: "training",
                table: "employees",
                column: "branchid");

            migrationBuilder.CreateIndex(
                name: "IX_employees_userid",
                schema: "training",
                table: "employees",
                column: "userid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_rolepermissions_permissionid",
                schema: "training",
                table: "rolepermissions",
                column: "permissionid");

            migrationBuilder.CreateIndex(
                name: "IX_transactions_accountid",
                schema: "training",
                table: "transactions",
                column: "accountid");

            migrationBuilder.CreateIndex(
                name: "IX_transactions_performedby",
                schema: "training",
                table: "transactions",
                column: "performedby");

            migrationBuilder.CreateIndex(
                name: "IX_userroles_roleid",
                schema: "training",
                table: "userroles",
                column: "roleid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "accountoperators",
                schema: "training");

            migrationBuilder.DropTable(
                name: "employees",
                schema: "training");

            migrationBuilder.DropTable(
                name: "rolepermissions",
                schema: "training");

            migrationBuilder.DropTable(
                name: "transactions",
                schema: "training");

            migrationBuilder.DropTable(
                name: "userroles",
                schema: "training");

            migrationBuilder.DropTable(
                name: "permissions",
                schema: "training");

            migrationBuilder.DropTable(
                name: "accounts",
                schema: "training");

            migrationBuilder.DropTable(
                name: "roles",
                schema: "training");

            migrationBuilder.DropTable(
                name: "branches",
                schema: "training");

            migrationBuilder.DropTable(
                name: "users",
                schema: "training");

            migrationBuilder.DropTable(
                name: "banks",
                schema: "training");
        }
    }
}
