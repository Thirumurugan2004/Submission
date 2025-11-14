import React, { useState } from "react";
import "./ButtonStyles.css";

function TimeoutButton() {
  const [result, setResult] = useState("");

  const handleTimeoutClick = () => {
    setTimeout(() => {
      setResult("Timeout: Completed");
    }, 500);
  };

  return (
    <div>
      <button
        data-testid="timeout-btn"
        onClick={handleTimeoutClick}
        className="button timeout"
      >
        SetTimeout Button
      </button>
      <p data-testid="timeout-result">{result}</p>
    </div>
  );
}

export default TimeoutButton;
