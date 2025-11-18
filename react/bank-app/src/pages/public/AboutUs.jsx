import React from "react";
import { Box, Typography, Grid } from "@mui/material";

export default function AboutUs() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        pt: "100px",
        pb: 8,
        backgroundColor: "#f1f5f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* CONTENT WRAPPER - CENTERS EVERYTHING */}
      <Box sx={{ width: "100%", maxWidth: "1200px", px: { xs: 3, md: 5 } }}>
        
        {/* TITLE */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#1e3a8a",
            mb: 2,
            textAlign: "center",
          }}
        >
          About Us
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          variant="h6"
          sx={{
            color: "#334155",
            textAlign: "center",
            maxWidth: "900px",
            mx: "auto",
            lineHeight: 1.7,
            mb: 4,
          }}
        >
          Bank-App is a modern digital banking platform designed to simplify financial
          management through seamless account access, secure transactions, and powerful
          administrative tools. We aim to deliver a world-class banking experience for
          both customers and financial institutions.
        </Typography>

        {/* IMAGE GALLERY TITLE */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#1e3a8a",
            mt: 5,
            mb: 3,
            textAlign: "center",
          }}
        >
          Our Vision & Infrastructure
        </Typography>

        {/* GALLERY */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80"
              alt="Corporate Bank Tower"
              style={{
                width: "100%",
                height: "260px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80"
              alt="Classic Bank"
              style={{
                width: "100%",
                height: "260px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <img
              src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1000&q=80"
              alt="Financial District"
              style={{
                width: "100%",
                height: "260px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </Grid>
        </Grid>

        {/* MISSION SECTION */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#1e3a8a",
            mt: 6,
            mb: 2,
            textAlign: "center",
          }}
        >
          Our Mission
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: "900px",
            textAlign: "center",
            mx: "auto",
            color: "#334155",
            lineHeight: 1.7,
          }}
        >
          We believe banking should be simple, secure, and accessible to everyone.
          Our mission is to empower users and organizations with tools that bring
          transparency, efficiency, and innovation to everyday financial operations.
          From multi-account access to admin-level management tools, Bank-App is built
          for the future of digital banking.
        </Typography>

      </Box>
    </Box>
  );
}
