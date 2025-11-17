import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Home() {
  const { userData } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");   // Go to login
  };

  return (
    <div>
      <NavBar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>🏦 Welcome to Bank Customer Portal 🏦</h1>

        {!userData ? (
          <>
            <p style={{ marginTop: "20px" }}>
              Please log in to view your details and manage users.
            </p>
            <button
              onClick={handleGoToLogin}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              🔑 Go to Login
            </button>
          </>
        ) : (
          <div
            style={{
              width: "400px",
              margin: "40px auto",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "left",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <h3>👋 Welcome, {userData.fullname}!</h3>
            <hr />
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Roles:</strong> {userData.roles.join(", ")}</p>
            <p>
              <strong>Status:</strong> Logged in ✅
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
