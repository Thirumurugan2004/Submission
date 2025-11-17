import React from "react";

function Button({ label, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        border: "none",
        borderRadius: "6px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s",
        ...style,
      }}
      onMouseOver={(e) => (e.target.style.opacity = "0.85")}
      onMouseOut={(e) => (e.target.style.opacity = "1")}
    >
      {label}
    </button>
  );
}

export default Button;
