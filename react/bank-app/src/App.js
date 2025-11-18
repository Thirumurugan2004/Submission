import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SidebarLayout from "./layouts/SidebarLayout";

/* PUBLIC PAGES */
import LandingPage from "./pages/public/LandingPage";
import AboutUs from "./pages/public/AboutUs";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* USER PAGES */
import AccountsPage from "./pages/user/AccountsPage";
import TransactionsPage from "./pages/user/TransactionsPage";

/* ADMIN PAGES */
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageBanks from "./pages/admin/ManageBanks";
import ManageBranches from "./pages/admin/ManageBranches";
import ManageUsers from "./pages/admin/ManageUsers";
import Contact from "./pages/public/Contact";

export default function App() {
  const { token } = useSelector((s) => s.auth);

  return (
    <BrowserRouter>
      {/* ALWAYS SHOW NAVBAR */}
      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />

        {/* USER ONLY ROUTES */}
        <Route element={<ProtectedRoute roles={["User"]} />}>
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

        {/* ADMIN & SUPER ADMIN ROUTES */}
        <Route element={<ProtectedRoute roles={["Admin", "Super Admin"]} />}>
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

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
