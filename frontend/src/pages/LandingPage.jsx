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

import "./LandingPage.css"; // ✅ Animated background

export default function LandingPage() {
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

  const handleLogin = (e) => {
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

    if (valid) {
      setLoading(true);
      enqueueSnackbar("Login successful! Redirecting...", { variant: "success" });

      setTimeout(() => {
        setLoading(false);
        navigate("/dba");
      }, 1500);
    } else {
      enqueueSnackbar("Please fill all required fields.", { variant: "error" });
    }
  };

  const handleForgotSubmit = () => {
    if (!forgotEmail.trim()) {
      setForgotError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      setForgotError("Please enter a valid email address");
      return;
    }

    setForgotError("");
    enqueueSnackbar("Password reset link sent to your email.", { variant: "info" });
    setForgotOpen(false);
    setForgotEmail("");
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
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
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
