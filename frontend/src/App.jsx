// src/App.jsx
import React, { useState, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import DBADashboard from "./pages/DBADashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import DispenserDashboard from "./pages/DispenserDashboard.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import ManageUsers from "./pages/ManageUsers.jsx"; // ✅ corrected import

const App = () => {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainApp mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
};

const MainApp = ({ mode, setMode }) => {
  const location = useLocation();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const role = localStorage.getItem("role") || sessionStorage.getItem("role");


  const isLoginPage = location.pathname === "/";

  return (
    <>
      {/* Sidebar only visible if logged in */}
      {!isLoginPage && token && <Sidebar mode={mode} setMode={setMode} />}

      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* DBA routes (protected) */}
        <Route
          path="/dba"
          element={
            <ProtectedRoute allowedRoles={["DBA"]}>
              <DBADashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dba/manage-users"
          element={
            <ProtectedRoute allowedRoles={["DBA"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        {/* Doctor */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={["Doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Dispenser */}
        <Route
          path="/dispenser"
          element={
            <ProtectedRoute allowedRoles={["Dispenser"]}>
              <DispenserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Patient */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={["Patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all → redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
