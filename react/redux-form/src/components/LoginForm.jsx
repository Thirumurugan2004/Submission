import React from "react";
import { useDispatch} from "react-redux";
import { submitForm, clearForm } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import Button from "./Button";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleSubmit = () => {
    dispatch(submitForm());
    navigate("/about"); 
  };

  const handleClear = () => {
    dispatch(clearForm());
  };

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
    </div>
  );
}

export default LoginForm;
