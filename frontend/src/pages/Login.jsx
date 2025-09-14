import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

import "./Login.css"; // ✅ Animated background

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ userId: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Forgot Password dialog state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // ✅ Handle login
  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    let newErrors = { userId: "", password: "" };
    let valid = true;

    if (!userId.trim()) {
      newErrors.userId = "User ID is required";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      enqueueSnackbar("Please fill all required fields.", { variant: "error" });
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        userId,
        password,
      });

      const { token, role } = res.data;

      // Store token securely
     // Store token + role securely
if (remember) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
} else {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("role", role);
}

      enqueueSnackbar("Login successful! Redirecting...", { variant: "success" });

      // Role-based redirect
      setTimeout(() => {
        setLoading(false);
        if (role?.toLowerCase() === "dba") navigate("/dba");
        else if (role === "Admin") navigate("/admin");
        else if (role === "Doctor") navigate("/doctor");
        else if (role === "Dispenser") navigate("/dispenser");
        else navigate("/patient");
      }, 1000);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(err.response?.data?.message || "Invalid credentials", {
        variant: "error",
      });
    }
  };

  // ✅ Forgot password handler
  const handleForgotSubmit = async () => {
    if (!forgotEmail.trim()) {
      setForgotError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      setForgotError("Please enter a valid email address");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email: forgotEmail,
      });
      enqueueSnackbar("Password reset link sent to your email.", {
        variant: "info",
      });
      setForgotOpen(false);
      setForgotEmail("");
      setForgotError("");
    } catch (err) {
      setForgotError(err.response?.data?.message || "Error sending reset email");
    }
  };

  return (
    <div className="landing-page-bg">
      <Paper
        elevation={6}
        style={{
          padding: "40px",
          maxWidth: "400px",
          textAlign: "center",
          borderRadius: "20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Avatar
          src="/logo2.jpg"
          alt="HMS Logo"
          style={{
            margin: "0 auto 20px",
            width: 100,
            height: 100,
          }}
        />

        {/* Title */}
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Welcome to HMS
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Please login to continue
        </Typography>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* User ID */}
          <TextField
            margin="normal"
            fullWidth
            label="User ID"
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            error={!!errors.userId}
            helperText={errors.userId}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Remember Me + Forgot Password */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
            mb={2}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember Me"
            />
            <Link
              href="#"
              underline="hover"
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                setForgotOpen(true);
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          {/* Login button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            style={{
              marginTop: "10px",
              borderRadius: "10px",
              padding: "10px",
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Paper>

      {/* Forgot Password Dialog */}
      <Dialog
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        PaperProps={{
          style: {
            borderRadius: "20px",
            padding: "20px",
            background: "linear-gradient(135deg, #ffffff, #f0f4f8)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle style={{ fontWeight: "bold", textAlign: "center" }}>
          Forgot Password
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="Enter your email"
            variant="outlined"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            error={!!forgotError}
            helperText={forgotError}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button
            onClick={() => setForgotOpen(false)}
            style={{ borderRadius: "10px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleForgotSubmit}
            variant="contained"
            color="primary"
            style={{ borderRadius: "10px" }}
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
