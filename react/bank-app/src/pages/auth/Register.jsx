import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", name: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", form);
      alert("Registration successful!");
      nav("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>Register</Typography>

      <form onSubmit={submit}>
        <TextField fullWidth margin="normal"
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextField fullWidth margin="normal"
          label="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <TextField fullWidth margin="normal"
          label="Password" type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Paper>
  );
}
