// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🚨 Not logged in → go to login immediately
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 🚨 Logged in but role not allowed → back to login
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Only mount children if allowed
  return children;
};

export default ProtectedRoute;
