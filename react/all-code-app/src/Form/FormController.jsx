import React, { useState } from "react";
import Form from "./Form";
import "./Form.css";

function FormController() {
  const [formData, setFormData] = useState({
    username: "Thiru",
    email: "",
    password: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  //  Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    alert("Form submitted successfully!");
  };

  // Handle clear
  const handleClear = () => {
    setFormData({ username: "", email: "", password: "" });
    setSubmittedData(null);
  };

  return (
    <div className="form-wrapper">
      <Form
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClear={handleClear}
      />

      {submittedData && (
        <div className="submitted-section">
          <h3>Submitted Data</h3>
          <p><strong>Username:</strong> {submittedData.username}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Password:</strong> {submittedData.password}</p>
        </div>
      )}
    </div>
  );
}

export default FormController;
