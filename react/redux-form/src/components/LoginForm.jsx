import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm, clearForm } from "../redux/loginSlice";
import FormField from "./FormField";
import Button from "./Button"; 

function LoginForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.login);

  const handleSubmit = () => {
    dispatch(submitForm());
  };

  const handleClear = () => {
    dispatch(clearForm());
  };

  console.log("Current Form Data:", formData);

  return (
    <div
      style={{
        width: "400px",
        margin: "60px auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Login Form</h2>

      <div style={{ textAlign: "left", marginLeft: "40px" }}>
        <FormField namespace="username" type="text" />
        <FormField namespace="email" type="email" />
        <FormField namespace="password" type="password" />
      </div>

  
      <div style={{ marginTop: "10px" }}>
        <Button label="Submit" onClick={handleSubmit} />
        <Button label="Reset" onClick={handleClear} />
      </div>

      
      {formData.submitted && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "left",
            marginLeft: "40px",
          }}
        >
          
          <p style={{ color: "green" }}>Form submitted successfully ✅</p>
          <hr />
          <h4>Submitted Data:</h4>
          <p>Username: {formData.username}</p>
          <p>Email: {formData.email}</p>
          <p>Password: {formData.password}</p>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
