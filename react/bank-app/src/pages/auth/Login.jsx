import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    dispatch(
      loginUser({
        username: data.get("username"),  // MUST MATCH API
        password: data.get("password"),
      })
    );
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
          "url('https://images.unsplash.com/photo-1495314736024-fa5e4b37b979?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
          zIndex: 1,
        }}
      />

      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: "450px",
          p: 4,
          borderRadius: "18px",
          zIndex: 2,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#1e3a8a",
          }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              py: 1.4,
              borderRadius: "10px",
              fontSize: "1.1rem",
              textTransform: "none",
              backgroundColor: "#1e40af",
              "&:hover": { backgroundColor: "#1e3a8a" },
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
