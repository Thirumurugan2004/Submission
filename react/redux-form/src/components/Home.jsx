import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";

function Home() {
  const formData = useSelector((state) => state.login);

  return (
    <div>
      <NavBar />
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Home Page</h1>
        {formData.submitted ? (
          <div style={{ marginTop: "20px" }}>
            <p style={{ color: "green" }}>Form submitted successfully ✅</p>
            <hr style={{ width: "300px" }} />
            <h3>Submitted Data:</h3>
            <p>Username: {formData.username}</p>
            <p>Email: {formData.email}</p>
            <p>Password: {formData.password}</p>
          </div>
        ) : (
          <p>No data submitted yet.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
