import React, { useState } from "react";
import "./ButtonStyles.css";

function PromiseButton() {
  const [result, setResult] = useState("");

  const handlePromiseClick = () => {
    return fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((data) => {
        setResult("Promise: " + data.message);
      });
  };

  return (
    <div>
      <button
        data-testid="promise-btn"
        onClick={handlePromiseClick}
        className="button promise"
      >
        Promise Button
      </button>
      <p data-testid="promise-result">{result.title}</p>
    </div>
  );
}

export default PromiseButton;
