import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../redux/loginSlice";

function FormField({ namespace, type }) {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.login[namespace]);

  const handleChange = (e) => {
    dispatch(setField({ field: namespace, value: e.target.value }));
  };

  return (
    <div style={{ marginBottom: "12px", textAlign: "left" }}>
      <label
        style={{
          display: "inline-block",
          width: "120px",
          fontWeight: "bold",
        }}
      >
        {namespace.charAt(0).toUpperCase() + namespace.slice(1)}:
      </label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={`Enter ${namespace}`}
        style={{ padding: "5px", width: "200px" }}
      />
    </div>
  );
}

export default FormField;
