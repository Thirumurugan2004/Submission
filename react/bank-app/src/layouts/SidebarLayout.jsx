import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Divider,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const drawerWidth = 240;

export default function SidebarLayout({ children }) {
  const { user } = useSelector((s) => s.auth);

  const roles = (user?.roles || []).map((r) => r.toUpperCase());

  const isAdmin = roles.includes("ADMIN");
  const isUser = !isAdmin && roles.includes("USER");  
  // IMPORTANT: User menu shows only if NOT admin

  return (
    <Box sx={{ display: "flex" }}>
      
      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#1976d2",
            color: "white",
            paddingTop: "10px",
          },
        }}
      >
        <Toolbar />
        
        <Typography sx={{ ml: 2, mb: 1, fontWeight: "bold" }}>
          Navigation
        </Typography>

        <List>

          {/* USER MENU */}
          {isUser && (
            <>
              <ListItemButton component={Link} to="/accounts">
                <ListItemText primary="Accounts" />
              </ListItemButton>

              <ListItemButton component={Link} to="/transactions">
                <ListItemText primary="Transactions" />
              </ListItemButton>

              <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.3)" }} />
            </>
          )}

          {/* ADMIN MENU */}
          {isAdmin && (
            <>
              <ListItemButton component={Link} to="/admin">
                <ListItemText primary="Admin Dashboard" />
              </ListItemButton>

              <ListItemButton component={Link} to="/admin/banks">
                <ListItemText primary="Manage Banks" />
              </ListItemButton>

              <ListItemButton component={Link} to="/admin/branches">
                <ListItemText primary="Manage Branches" />
              </ListItemButton>

              <ListItemButton component={Link} to="/admin/users">
                <ListItemText primary="Manage Users" />
              </ListItemButton>

              <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.3)" }} />
            </>
          )}

          {/* COMMON LINKS */}
          <ListItemButton component={Link} to="/about">
            <ListItemText primary="About Us" />
          </ListItemButton>

        </List>
      </Drawer>

      {/* PAGE CONTENT */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
