import React, { useState } from "react";
import "./ButtonStyles.css";

function AsyncButton() {
  const [result, setResult] = useState("");

  const handleAsyncClick = async () => {
    const res = await fetch("https://api.example.com/async");
    const data = await res.json();
    setResult("Async: " + data.message);
  };

  return (
    <div>
      <button
        data-testid="async-btn"
        onClick={handleAsyncClick}
        className="button async"
      >
        Async Await Button
      </button>
      <p data-testid="async-result">{result}</p>
    </div>
  );
}

export default AsyncButton;
