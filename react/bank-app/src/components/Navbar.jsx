import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { token } = useSelector((s) => s.auth);
  const { pathname } = useLocation();

  // Hide Navbar completely if user is logged in
  if (token) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">BANK-APP</Button>
        <Button color="inherit" component={Link} to="/about">ABOUT</Button>
        <Button color="inherit" component={Link} to="/login">LOGIN</Button>
        <Button color="inherit" component={Link} to="/register">REGISTER</Button>
      </Toolbar>
    </AppBar>
  );
}
