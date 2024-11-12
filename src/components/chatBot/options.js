// Options.js
import React from "react";
import { Button, Box } from "@mui/material";

const Options = (props) => {
  const handleDonate = () => {
    props.actionProvider.handleDonate();
  };

  const handleGetMedicine = () => {
    props.actionProvider.handleGetMedicine();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Button variant="contained" onClick={handleDonate}>
        Donate Medicine
      </Button>
      <Button variant="contained" onClick={handleGetMedicine}>
        Get Medicine
      </Button>
    </Box>
  );
};

export default Options;
