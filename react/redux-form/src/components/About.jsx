import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";

function About() {
  const { userData } = useSelector((state) => state.login);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Decode JWT Token and log to console
  useEffect(() => {
    if (userData?.token) {
      console.log("🔑 Token:", userData.token);

      try {
        const base64Url = userData.token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decoded = JSON.parse(jsonPayload);
        console.log("🧩 Decoded Token Payload:", decoded);
      } catch (error) {
        console.error("❌ Error decoding token:", error);
      }
    }
  }, [userData]);

  // ✅ Fetch all users using token
  const fetchAllUsers = async () => {
    if (!userData?.token) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://localhost:7220/BankCustomerAPI/user/${userData.userId}/all`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 403) throw new Error("No permission to view users");
        if (response.status === 401) throw new Error("Unauthorized — please log in again");
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();
      setUsers(result);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching all users:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllUsers();
  }, [userData]);

  return (
    <div>
      <NavBar />
      <h1 style={{ textAlign: "center", marginTop: "30px" }}>About Page</h1>

      {userData ? (
        <>
          <div
            style={{
              width: "400px",
              margin: "20px auto",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "left",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <p style={{ color: "green" }}>{userData.message}</p>
            <hr />
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Full Name:</strong> {userData.fullname}
            </p>
            <p>
              <strong>Roles:</strong> {userData.roles.join(", ")}
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h3>All Active Users</h3>
            {loading && <p>Loading users...</p>}
            {error && <p style={{ color: "red" }}>❌ {error}</p>}

            {!loading && users.length > 0 && (
              <table
                style={{
                  margin: "20px auto",
                  borderCollapse: "collapse",
                  width: "80%",
                  textAlign: "center",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                    <th style={thStyle}>User ID</th>
                    <th style={thStyle}>Full Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.userId} style={{ borderBottom: "1px solid #ccc" }}>
                      <td style={tdStyle}>{u.userId}</td>
                      <td style={tdStyle}>{u.fullName}</td>
                      <td style={tdStyle}>{u.email}</td>
                      <td style={tdStyle}>{u.isActive ? "✅" : "❌"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>
          No login data available. Please login first.
        </p>
      )}
    </div>
  );
}

const thStyle = { padding: "8px", border: "1px solid #ccc" };
const tdStyle = { padding: "8px", border: "1px solid #ccc" };

export default About;
