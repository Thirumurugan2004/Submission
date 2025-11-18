import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SidebarLayout from "./layouts/SidebarLayout";

import LandingPage from "./pages/public/LandingPage";
import AboutUs from "./pages/public/AboutUs";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AccountsPage from "./pages/user/AccountsPage";
import TransactionsPage from "./pages/user/TransactionsPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageBanks from "./pages/admin/ManageBanks";
import ManageBranches from "./pages/admin/ManageBranches";
import ManageUsers from "./pages/admin/ManageUsers";

export default function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        {/* PUBLIC PAGES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ONLY */}
        <Route element={<ProtectedRoute roles={["USER"]} />}>
          <Route
            path="/accounts"
            element={
              <SidebarLayout>
                <AccountsPage />
              </SidebarLayout>
            }
          />
          <Route
            path="/transactions"
            element={
              <SidebarLayout>
                <TransactionsPage />
              </SidebarLayout>
            }
          />
        </Route>

        {/* ADMIN ONLY */}
        <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
          <Route
            path="/admin"
            element={
              <SidebarLayout>
                <AdminDashboard />
              </SidebarLayout>
            }
          />
          <Route
            path="/admin/banks"
            element={
              <SidebarLayout>
                <ManageBanks />
              </SidebarLayout>
            }
          />
          <Route
            path="/admin/branches"
            element={
              <SidebarLayout>
                <ManageBranches />
              </SidebarLayout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <SidebarLayout>
                <ManageUsers />
              </SidebarLayout>
            }
          />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}
