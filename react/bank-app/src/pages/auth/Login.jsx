import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const submit = async (e) => {
    e.preventDefault();

    const res = await dispatch(login(form));

    if (res.meta.requestStatus === "fulfilled") {
      const role = (res.payload.user.role || "").toUpperCase();

      // FIX 2 — Redirect based on role
      if (role === "ADMIN") navigate("/admin");
      else navigate("/accounts");
    }
  };

  return (
    <Paper sx={{ maxWidth: 400, mx: "auto", p: 3, mt: 5 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>

      <form onSubmit={submit}>
        <TextField
          label="Email / Username"
          fullWidth
          margin="normal"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <Typography color="error">{error}</Typography>}

        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </Paper>
  );
}
