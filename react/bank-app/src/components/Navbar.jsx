import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutUser } from "../redux/slices/authSlice";

export default function Navbar() {
  const { token, user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roles = (user?.roles || []).map(r => r.toUpperCase());
  const isAdmin = roles.includes("ADMIN") || roles.includes("SUPER ADMIN");
  const isUser = roles.includes("USER");

  const goHome = () => {
    if (!token) navigate("/");
    else if (isAdmin) navigate("/admin");
    else navigate("/accounts");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar>

        <Button color="inherit" onClick={goHome}>HOME</Button>

        <Button color="inherit" component={Link} to="/about">ABOUT</Button>

        <Button color="inherit" component={Link} to="/contact">CONTACT</Button>

        {!token && (
          <>
            <Button color="inherit" component={Link} to="/login">LOGIN</Button>
            <Button color="inherit" component={Link} to="/register">REGISTER</Button>
          </>
        )}

        {token && (
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{ marginLeft: "auto" }}
          >
            LOGOUT
          </Button>
        )}

      </Toolbar>
    </AppBar>
  );
}
