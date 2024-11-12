// GetMedicineOptions.js
import React from "react";
import { Button, Box } from "@mui/material";

const GetMedicineOptions = (props) => {
  const handleViewCatalog = () => {
    // Implement navigation to medicine catalog
    window.location.href = "/medicines"; // Example navigation
  };

  const handleCancel = () => {
    props.actionProvider.handleCancel();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Button variant="contained" onClick={handleViewCatalog}>
        View Medicine Catalog
      </Button>
      <Button variant="contained" onClick={handleCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default GetMedicineOptions;
