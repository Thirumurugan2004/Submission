import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearForm, loginUser } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import FormField from "./FormField";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, password, loading, error } = useSelector(
    (state) => state.login
  );

  const handleSubmit = async () => {
    if (!username || !password) {
      alert("⚠️ Please enter both username and password.");
      return;
    }
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleClear = () => {
    dispatch(clearForm());
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        fontFamily: "Segoe UI, Roboto, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "400px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            background: "linear-gradient(90deg, #007bff, #0056b3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🔐 Login to Bank Portal
        </h2>

        <div style={{ textAlign: "left", margin: "20px 0" }}>
          <FormField namespace="username" type="text" />
          <FormField namespace="password" type="password" />
        </div>

        {/* ✅ Three-button row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button
            label="🏠 Home"
            onClick={handleHome}
            style={{
              flex: 1,
              marginRight: "8px",
              backgroundColor: "#17a2b8",
            }}
          />
          <Button
            label={loading ? "Logging in..." : "🔑 Login"}
            onClick={handleSubmit}
            style={{
              flex: 1,
              marginRight: "8px",
              backgroundColor: "#007bff",
            }}
          />
          <Button
            label="♻️ Reset"
            onClick={handleClear}
            style={{
              flex: 1,
              backgroundColor: "#6c757d",
            }}
          />
        </div>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            ❌ {error}
          </p>
        )}

        {!error && !loading && (
          <p
            style={{
              textAlign: "center",
              color: "#555",
              fontSize: "13px",
              marginTop: "20px",
            }}
          >
            Use your Bank Admin credentials to log in.
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
