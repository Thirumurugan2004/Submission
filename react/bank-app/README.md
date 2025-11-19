💳 Bank Customer Management System

A complete full-stack banking application built with React + Redux Toolkit (frontend) and ASP.NET Core Web API (backend) with JWT authentication, role-based authorization, account management, and transaction handling.

This project simulates a real banking environment where customers and administrators can perform secure operations such as managing branches, banks, users, accounts, and financial transactions.

🚀 Features
👤 Authentication & Authorization

Secure login with JWT Bearer Tokens

Refresh token rotation

Role-based access control:

Super Admin

Admin

Manager

User

Auto-redirect based on login role

🏦 Admin Features

Admins can manage all banking entities:

1. Bank Management

Create / Edit / Delete banks

Sorting (ID, Name, Headquarters)

Search (by name, ID, head office)

Clean UI with dialogs

2. Branch Management

Create / Edit / Delete branches

Fields include IFSC, city, state, country

Sorting + searching + filtering

3. User Management

Create new users with password hashing + salt

Update user info (phone, DOB, email)

Soft delete users

Search + sort

4. Account Administration

Create accounts for users

Close accounts

View all accounts with branch info

💼 User Features
Accounts

View all personal accounts

Real-time balance updates

Create account (if admin gives access)

Close account

Transactions

Deposit

Withdraw

Transfer between accounts

Transaction history (date range filtering)

Recent transactions sidebar

🧱 Tech Stack
Frontend

React.js

Redux Toolkit

Axios

React Router

Material UI (MUI)

JWT handling via interceptors

Backend

ASP.NET Core 7 Web API

SQL Server

Entity Framework Core

JWT Authentication

Refresh Token System

Role-Based Authorization

CORS Configuration

🗂 Project Structure
Frontend (/react/banking-app)
src/
 ├── components/
 ├── layouts/
 ├── pages/
 │    ├── admin/
 │    ├── auth/
 │    ├── user/
 │    └── public/
 ├── redux/
 │    ├── slices/
 │    └── store.js
 ├── api/axios.js
 └── App.jsx

Backend (/BankCustomerAPI)
Controllers/
 ├── AuthController.cs
 ├── UserController.cs
 ├── BankController.cs
 ├── BranchController.cs
 ├── AccountController.cs
 └── TransactionController.cs

Entities/
Models/
Data/
Services/
Program.cs

🔐 Authentication Flow

User logs in → server generates JWT + RefreshToken

JWT stored in localStorage

Refresh token stored in HttpOnly cookie

Axios interceptors automatically refresh token when expired

Role is extracted from JWT → UI redirects to:

/admin

/accounts

💳 Banking Features
Account Structure

Each account includes:

Account Number

Type (Savings / Current)

Branch

Interest Rate

Balance

Status (Active/Closed)

Transactions

Each transaction stores:

Type (Deposit / Withdraw / Transfer)

Date & Time

Amount

Reference No.

Performed By

Remarks

🧪 API Endpoints (Summary)
Authentication
POST /login
POST /refresh
POST /logout
POST /register

Users
POST /user/create
PUT  /user/update?id=
GET  /user/{id}/read
DELETE /user/{id}/delete
GET /user/all

Banks
POST /banks/create
GET /banks
PUT /banks/{id}/update
DELETE /banks/{id}/delete

Branches
POST /branches/create
GET /branches
PUT /branches/{id}/update
DELETE /branches/{id}/delete

Accounts
POST /accounts/{userId}/create
GET  /accounts/my
GET  /accounts/all
PUT  /accounts/{id}/close

Transactions
POST /transactions/deposit
POST /transactions/withdraw
POST /transactions/transfer
GET  /transactions/{accountId}/recent
GET  /transactions/{accountId}/history

⚙️ Setup Instructions
Backend Setup

Update appsettings.json with SQL Server connection.

Run EF migrations:

dotnet ef database update


Start API:

dotnet run

Frontend Setup

Go to React folder:

cd react/banking-app


Install dependencies:

npm install


Start UI:

npm start

📸 Screenshots (Optional)

(Add your screenshots here for UI demo)

🏁 Conclusion

This project demonstrates:
✔ Full-stack development
✔ Authentication & authorization
✔ Clean React UI with Redux
✔ Real banking operations
✔ Admin-level control panel
✔ SQL-backed EF Core data layer