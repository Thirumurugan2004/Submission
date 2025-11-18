import React from "react";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Toolbar,
    Box,
    Divider,
    Typography,
    Button
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const drawerWidth = 240;

export default function SidebarLayout({ children }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((s) => s.auth);
    const roles = (user?.roles || []).map((r) => r.toUpperCase());

    const isAdmin = roles.includes("ADMIN") || roles.includes("SUPER ADMIN");
    const isUser = roles.includes("USER") && !isAdmin;

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    const menuButtonStyle = (path) => ({
        backgroundColor: location.pathname === path ? "rgba(255,255,255,0.15)" : "transparent",
        borderRadius: "8px",
        marginBottom: "4px",
        "&:hover": {
            backgroundColor: "rgba(255,255,255,0.25)"
        }
    });

    return (
        <Box sx={{ display: "flex" }}>
            {/* SIDEBAR */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        backgroundColor: "#1e3a8a",
                        color: "white",
                        borderRight: "3px solid #0f1e4a",
                        padding: "12px",
                    },
                }}
            >
                <Toolbar />

                {/* Title */}
                {/* <Typography
                    sx={{
                        ml: 1,
                        mb: 2,
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "#e2e8f0",
                    }}
                >
                    Navigation
                </Typography> */}

                <List sx={{ paddingRight: "6px" }}>

                    {/* USER MENU */}
                    {isUser && (
                        <>
                            <ListItemButton
                                component={Link}
                                to="/accounts"
                                sx={menuButtonStyle("/accounts")}
                            >
                                <ListItemIcon><AccountBalanceIcon sx={{ color: "white" }} /></ListItemIcon>
                                <ListItemText primary="Accounts" />
                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/transactions"
                                sx={menuButtonStyle("/transactions")}
                            >
                                <ListItemIcon><ReceiptLongIcon sx={{ color: "white" }} /></ListItemIcon>
                                <ListItemText primary="Transactions" />
                            </ListItemButton>

                            <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.3)" }} />
                        </>
                    )}

                    {/* ADMIN MENU */}
                    {isAdmin && (
                        <>
                            <ListItemButton
                                component={Link}
                                to="/admin"
                                sx={menuButtonStyle("/admin")}
                            >
                                <ListItemIcon><DashboardIcon sx={{ color: "white" }} /></ListItemIcon>
                                <ListItemText primary="Admin Dashboard" />
                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/admin/banks"
                                sx={menuButtonStyle("/admin/banks")}
                            >
                                <ListItemIcon><StoreIcon sx={{ color: "white" }} /></ListItemIcon>
                                <ListItemText primary="Manage Banks" />
                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/admin/branches"
                                sx={menuButtonStyle("/admin/branches")}
                            >
                                <ListItemIcon><StoreIcon sx={{ color: "white" }} /></ListItemIcon>
                                <ListItemText primary="Manage Branches" />
                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/admin/users"
                                sx={menuButtonStyle("/admin/users")}
                            >
                                <ListItemIcon><PeopleIcon sx={{ color: "white" }} /></ListItemIcon>
                                <ListItemText primary="Manage Users" />
                            </ListItemButton>
                        </>
                    )}
                </List>

                {/* LOGOUT BUTTON */}
                <Box sx={{ mt: "auto", p: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                            fontWeight: "bold",
                            textTransform: "none",
                            borderRadius: "10px",
                            backgroundColor: "#ef4444",
                            "&:hover": { backgroundColor: "#dc2626" },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Drawer>

            {/* MAIN CONTENT */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: "24px",
                    mt: "70px", // space for top navbar
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
