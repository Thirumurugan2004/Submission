import React from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Manage Banks</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Create, update or delete bank entries.
            </Typography>
            <Button variant="contained" component={Link} to="/admin/banks">
              Open
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Manage Branches</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Add or view branches for each bank.
            </Typography>
            <Button variant="contained" component={Link} to="/admin/branches">
              Open
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Manage Users</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Create and manage system users.
            </Typography>
            <Button variant="contained" component={Link} to="/admin/users">
              Open
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
