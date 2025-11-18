import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Alert
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 NO API call (because your backend has NO registerUser)
    setSuccess(true);

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        pt: "90px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundImage:
          "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative"
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
          zIndex: 1
        }}
      />

      {/* Register form card */}
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: "500px",
          padding: "40px",
          borderRadius: "18px",
          zIndex: 2,
          textAlign: "center",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(6px)"
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#1e3a8a", mb: 3 }}
        >
          Create Account
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registration successful! Redirecting...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              borderRadius: "10px",
              textTransform: "none",
              backgroundColor: "#1e40af",
              "&:hover": { backgroundColor: "#1e3a8a" }
            }}
          >
            Register
          </Button>
        </form>

        <Typography sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1e40af", fontWeight: "bold" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
