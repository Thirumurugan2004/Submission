import React from "react";
import { Button, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to bank-app
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Manage your bank accounts, transactions, and admin features.
      </Typography>

      <Button variant="contained" component={Link} to="/login">
        Go to Login
      </Button>
    </Paper>
  );
}
