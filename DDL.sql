-- ==========================================================
-- Simple User and Account Management System (Sprint 0)
-- Database: training | Schema: training
-- ==========================================================

CREATE DATABASE training;
GO

USE training;
GO

CREATE SCHEMA training;
GO

-- ==========================================================
-- Common Entities
-- ==========================================================

CREATE TABLE training.roles (
    roleid INT IDENTITY(1,1) PRIMARY KEY,
    rolename NVARCHAR(100) NOT NULL UNIQUE,
    description NVARCHAR(500) NULL,
    createdat DATETIME2(3) NOT NULL DEFAULT SYSDATETIME(),
    updatedat DATETIME2(3) NULL
);
GO

CREATE TABLE training.permissions (
    permissionid INT IDENTITY(1,1) PRIMARY KEY,
    permissionname NVARCHAR(100) NOT NULL UNIQUE,
    description NVARCHAR(500) NULL,
    createdat DATETIME2(3) NOT NULL DEFAULT SYSDATETIME(),
    updatedat DATETIME2(3) NULL
);
GO

CREATE TABLE training.rolepermissions (
    roleid INT NOT NULL,
    permissionid INT NOT NULL,
    assignedat DATETIME2(3) NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT pk_rolepermissions PRIMARY KEY (roleid, permissionid),
    CONSTRAINT fk_rolepermissions_role FOREIGN KEY (roleid) REFERENCES training.roles(roleid),
    CONSTRAINT fk_rolepermissions_permission FOREIGN KEY (permissionid) REFERENCES training.permissions(permissionid)
);
GO

-- ==========================================================
-- Domain Entities
-- ==========================================================

CREATE TABLE training.banks (
    bankid INT IDENTITY(100,1) PRIMARY KEY,
    bankname NVARCHAR(200) NOT NULL,
    headofficeaddress NVARCHAR(500) NULL,
    establisheddate DATE NULL,
    createdat DATETIME2(3) NOT NULL DEFAULT SYSDATETIME()
);
GO

CREATE TABLE training.branches (
    branchid INT IDENTITY(1000,1) PRIMARY KEY,
    bankid INT NOT NULL,
    branchcode CHAR(8) NOT NULL UNIQUE, -- fixed-length for codes
    branchname NVARCHAR(150) NOT NULL,
    ifsccode CHAR(11) NOT NULL UNIQUE,  -- standardized 11-char IFSC
    address NVARCHAR(500) NULL,
    city NVARCHAR(100) NOT NULL,
    state NVARCHAR(100) NOT NULL,
    country NVARCHAR(100) NOT NULL DEFAULT 'India',
    createdat DATETIME2(3) NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT fk_branch_bank FOREIGN KEY (bankid) REFERENCES training.banks(bankid)
);
GO

CREATE TABLE training.users (
    userid BIGINT IDENTITY(10000,1) PRIMARY KEY,
    fullname NVARCHAR(200) NOT NULL,
    email NVARCHAR(200) NOT NULL UNIQUE,
    phonenumber VARCHAR(15) NULL,
    passwordhash NVARCHAR(500) NOT NULL,
    salt NVARCHAR(200) NULL,
    dateofbirth DATE NULL,
    isminor BIT NOT NULL DEFAULT 0,
    isactive BIT NOT NULL DEFAULT 1,
    createdat DATETIME2(3) NOT NULL DEFAULT SYSDATETIME(),
    updatedat DATETIME2(3) NULL
);
GO

CREATE TABLE training.userroles (
    userid BIGINT NOT NULL,
    roleid INT NOT NULL,
    assignedat DATETIME2(3) NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT pk_userroles PRIMARY KEY (userid, roleid),
    CONSTRAINT fk_userroles_user FOREIGN KEY (userid) REFERENCES training.users(userid),
    CONSTRAINT fk_userroles_role FOREIGN KEY (roleid) REFERENCES training.roles(roleid)
);
GO

CREATE TABLE training.employees (
    employeeid BIGINT IDENTITY(50000,1) PRIMARY KEY,
    bankid INT NOT NULL,
    branchid INT NOT NULL,
    userid BIGINT NOT NULL UNIQUE,
    employeecode CHAR(10) NOT NULL UNIQUE,
    designation NVARCHAR(100) NOT NULL,
    hiredate DATE NOT NULL,
    isactive BIT NOT NULL DEFAULT 1,
    createdat DATETIME2(3) NOT NULL DEFAULT SYSDATETIME(),
    updatedat DATETIME2(3) NULL,
    CONSTRAINT fk_employee_bank FOREIGN KEY (bankid) REFERENCES training.banks(bankid),
    CONSTRAINT fk_employee_branch FOREIGN KEY (branchid) REFERENCES training.branches(branchid),
    CONSTRAINT fk_employee_user FOREIGN KEY (userid) REFERENCES training.users(userid)
);
GO

CREATE TABLE training.accounts (
    accountid BIGINT IDENTITY(100000,1) PRIMARY KEY,
    userid BIGINT NOT NULL,
    branchid INT NOT NULL,
    accounttype NVARCHAR(20) NOT NULL CHECK (accounttype IN ('SAVINGS', 'CURRENT', 'TERM_DEPOSIT')),
    accountnumber CHAR(14) NOT NULL UNIQUE,
    currencycode CHAR(3) NOT NULL DEFAULT 'INR',
    balance DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    interestrate DECIMAL(5,2) NULL,
    isactive BIT NOT NULL DEFAULT 1,
    openedon DATETIME2(3) NOT NULL DEFAULT SYSDATETIME(),
    closedon DATETIME2(3) NULL,
    CONSTRAINT fk_account_user FOREIGN KEY (userid) REFERENCES training.users(userid),
    CONSTRAINT fk_account_branch FOREIGN KEY (branchid) REFERENCES training.branches(branchid)
);
GO

CREATE TABLE training.accountoperators (
    operatorid BIGINT IDENTITY(1000000,1) PRIMARY KEY,
    accountid BIGINT NOT NULL,
    operatoruserid BIGINT NOT NULL,
    operatortype NVARCHAR(30) NOT NULL CHECK (operatortype IN ('MINOR_GUARDIAN', 'POA')),
    startdate DATE NOT NULL DEFAULT GETDATE(),
    enddate DATE NULL,
    CONSTRAINT fk_accountoperator_account FOREIGN KEY (accountid) REFERENCES training.accounts(accountid),
    CONSTRAINT fk_accountoperator_user FOREIGN KEY (operatoruserid) REFERENCES training.users(userid)
);
GO

-- ==========================================================
-- Transaction Tables
-- ==========================================================

CREATE TABLE training.transactions (
    transactionid BIGINT IDENTITY(100000000,1) PRIMARY KEY,
    accountid BIGINT NOT NULL,
    transactiontype NVARCHAR(20) NOT NULL CHECK (transactiontype IN ('DEPOSIT', 'WITHDRAWAL', 'BALANCE_CHECK', 'CLOSE_ACCOUNT')),
    amount DECIMAL(18,2) NOT NULL CHECK (amount >= 0),
    transactiondate DATETIME2(3) NOT NULL DEFAULT SYSDATETIME(),
    performedby BIGINT NOT NULL,
    remarks NVARCHAR(500) NULL,
    referencenumber CHAR(16) NOT NULL UNIQUE,
    CONSTRAINT fk_transaction_account FOREIGN KEY (accountid) REFERENCES training.accounts(accountid),
    CONSTRAINT fk_transaction_user FOREIGN KEY (performedby) REFERENCES training.users(userid)
);
GO
