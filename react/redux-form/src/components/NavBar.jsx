import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearForm } from "../redux/loginSlice";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.login);

  const currentPath = location.pathname;

  const baseStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: "6px",
    transition: "0.3s",
  };

  const activeStyle = {
    backgroundColor: "yellow",
    color: "#000",
  };

  const handleLogout = () => {
    dispatch(clearForm());
    navigate("/home");
  };

  return (
    <nav
      style={{
        backgroundColor: "#007bff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      {/* Always show Home */}
      <Link
        to="/home"
        style={{
          ...baseStyle,
          ...(currentPath === "/home" ? activeStyle : {}),
        }}
      >
        Home
      </Link>

      {/* Show Login if not logged in */}
      {!userData && (
        <Link
          to="/"
          style={{
            ...baseStyle,
            ...(currentPath === "/" ? activeStyle : {}),
          }}
        >
          Login
        </Link>
      )}

      {/* Show others only after login */}
      {userData && (
        <>
          <Link
            to="/about"
            style={{
              ...baseStyle,
              ...(currentPath === "/about" ? activeStyle : {}),
            }}
          >
            About
          </Link>

          <Link
            to="/contact"
            style={{
              ...baseStyle,
              ...(currentPath === "/contact" ? activeStyle : {}),
            }}
          >
            Contact
          </Link>

          <span
            onClick={handleLogout}
            style={{
              ...baseStyle,
              cursor: "pointer",
              backgroundColor: "#dc3545",
              color: "white",
            }}
          >
            Logout
          </span>
        </>
      )}
    </nav>
  );
}

export default NavBar;
