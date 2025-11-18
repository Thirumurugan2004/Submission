import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ roles }) {
  const { user } = useSelector((s) => s.auth);

  if (!user) return <Navigate to="/login" />;

  const userRoles = (user.roles || []).map((r) => r.trim());

  // Check if ANY of the required roles exists in userRoles
  const hasAccess = roles.some((role) => userRoles.includes(role));

  if (!hasAccess) {
    // Redirect ADMIN to /admin if they try opening user pages
    if (userRoles.includes("Admin") || userRoles.includes("Super Admin")) {
      return <Navigate to="/admin" replace />;
    }

    // Redirect USER to /accounts if they try to open admin pages
    return <Navigate to="/accounts" replace />;
  }

  return <Outlet />;
}
