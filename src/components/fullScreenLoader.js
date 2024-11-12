import React from "react";
import { Box } from "@mui/material";
import logo from "../assets/images/main-logo.png"; // Path to your logo image

// Full-screen loader component
const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "primary.main", // Background color of the loader
        zIndex: 9999, // Ensure it stays on top of other elements
      }}
    >
      {/* Logo with animation */}
      <Box
        component="img"
        src={logo}
        alt="Loading"
        sx={{
          width: 300, // Set the width of your logo
          height: 200, // Set the height of your logo
          animation: "pulse 2s infinite ease-in-out", // CSS animation
        }}
      />
    </Box>
  );
};

export default FullScreenLoader;
