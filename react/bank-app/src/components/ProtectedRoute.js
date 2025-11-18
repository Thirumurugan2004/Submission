import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ roles = [] }) {
  const { token, user } = useSelector((state) => state.auth);

  // User not logged in → redirect
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Normalize user roles (array from API)
  const userRoles = (user?.roles || []).map((r) => r.toUpperCase());

  // Extract primary role (first in list)
  const primaryRole = userRoles[0] || "";

  // If allowedRoles is provided, check match
  if (roles.length > 0) {
    const requiredRoles = roles.map((r) => r.toUpperCase()); // normalize allowed roles
    const hasAccess =
      requiredRoles.includes(primaryRole) ||
      userRoles.some((r) => requiredRoles.includes(r));

    if (!hasAccess) {
      return (
        <div style={{ padding: 20, fontSize: 18, color: "red" }}>
          Access Denied — You don't have permission
        </div>
      );
    }
  }

  return <Outlet />;
}
