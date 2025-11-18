import React from "react";
import { Typography, Paper } from "@mui/material";

export default function AboutUs() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>About Us</Typography>
      <Typography>
        This is a banking aggregator demo app built with React + Material UI.
      </Typography>
    </Paper>
  );
}
