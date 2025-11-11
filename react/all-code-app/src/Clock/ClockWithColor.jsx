import React, { useState } from "react";
import TimeDisplay from "./TimeDisplay";

function ClockWithColor() {
  const [color, setColor] = useState("black");

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Time Component */}
      <h2 style={{ color: color }}>
        Current Time: <TimeDisplay />
      </h2>

      {/* Color Dropdown */}
      <label htmlFor="colorSelect" style={{ marginRight: "10px" }}>
        Choose Color:
      </label>

      <select id="colorSelect" value={color} onChange={handleColorChange}>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </select>

      {/* Selected Color Display */}
      <p style={{ marginTop: "20px", fontSize: "18px" }}>
        Selected Color:{" "}
        <span style={{ color: color, fontWeight: "bold" }}>{color}</span>
      </p>
    </div>
  );
}

export default ClockWithColor;
