import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LandingPage() {
  const { token } = useSelector((s) => s.auth);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        pt: "90px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        // High-quality modern bank building image
        backgroundImage:
          "url('https://images.unsplash.com/photo-1495314736024-fa5e4b37b979?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
          zIndex: 1,
        }}
      />

      {/* HERO CONTENT */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
          px: 3,
          maxWidth: "900px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: { xs: "2.2rem", md: "3.2rem" },
            textShadow: "0 3px 8px rgba(0,0,0,0.7)",
          }}
        >
          Welcome to Bank-App
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            lineHeight: 1.7,
            fontSize: { xs: "1.1rem", md: "1.3rem" },
            textShadow: "0 2px 6px rgba(0,0,0,0.6)",
            color: "#e2e8f0",
          }}
        >
          Secure, modern, and efficient banking — all in one place.
          Manage accounts, transactions, and admin features with confidence.
        </Typography>

        {!token && (
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/login"
            sx={{
              px: 6,
              py: 1.6,
              fontSize: "1.1rem",
              borderRadius: "12px",
              fontWeight: "600",
              textTransform: "none",
              backgroundColor: "#2563eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              "&:hover": {
                backgroundColor: "#1e40af",
              },
            }}
          >
            Get Started
          </Button>
        )}
      </Box>
    </Box>
  );
}
