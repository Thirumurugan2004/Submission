import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Alert,
} from "@mui/material";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);

    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", pt: "90px" }}>
      {/* HEADER */}
      <Box
        sx={{
          textAlign: "center",
          py: 5,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Contact Us
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          We're here to help — reach out anytime.
        </Typography>
      </Box>

      {/* FORM + DETAILS */}
      <Grid
        container
        spacing={4}
        sx={{ px: { xs: 2, md: 8 }, py: 6, alignItems: "flex-start" }}
      >
        {/* CONTACT FORM */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{ p: 4, borderRadius: "14px", backgroundColor: "#f9fafb" }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Send us a message
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Your message has been sent!
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={form.message}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  py: 1.3,
                  textTransform: "none",
                  fontSize: "1rem",
                  backgroundColor: "#1e3a8a",
                  "&:hover": { backgroundColor: "#162d6b" },
                }}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* CONTACT DETAILS + MAP */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Reach Us
          </Typography>

          <Typography sx={{ mb: 1 }}>
            📍 <strong>Address:</strong> 123 Bank Street, Chennai, India
          </Typography>

          <Typography sx={{ mb: 1 }}>
            📞 <strong>Phone:</strong> +91 98765 43210
          </Typography>

          <Typography sx={{ mb: 3 }}>
            📧 <strong>Email:</strong> support@bankapp.com
          </Typography>

          <Box
            sx={{
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <iframe
              title="Bank Location"
              width="100%"
              height="280"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8709582340903!2d80.24327387454682!3d12.912487316404514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d708b00cf9%3A0x7cdbaff342a2e599!2sChennai%20India!5e0!3m2!1sen!2sin!4v1700000000000"
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
