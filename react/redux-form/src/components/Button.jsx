import React from "react";

function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginRight: "10px",
        padding: "8px 16px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

export default Button;
