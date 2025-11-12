import React from "react";
import { NavLink} from "react-router-dom";

function NavBar() {
  
  return (
    <nav
      style={{
        backgroundColor: "rgb(0 207 255)",
        padding: "20px 20px",
        display: "flex",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      <NavLink
        to="/home"
        style={({ isActive }) => ({
          color: isActive ? "yellow" : "white",
          textDecoration: "none",
          fontWeight: "bold",
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? "yellow" : "white",
          textDecoration: "none",
          fontWeight: "bold",
        })}
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        style={({ isActive }) => ({
          color: isActive ? "yellow" : "white",
          textDecoration: "none",
          fontWeight: "bold",
        })}
      >
        Contact
      </NavLink>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? "yellow" : "white",
          textDecoration: "none",
          fontWeight: "bold",
        })}
      >
        Logout
      </NavLink>
    </nav>
  );
}

export default NavBar;
