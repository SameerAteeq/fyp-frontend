// DonateOptions.js
import React, { useContext } from "react";
import { Button, Box } from "@mui/material";
import { ChatbotContext } from "./chatBot";

const DonateOptions = (props) => {
  const { toggleChat } = useContext(ChatbotContext);
  const handleProvideDetails = () => {
    window.location.href = "/medicines";
    toggleChat();
  };

  const handleCancel = () => {
    props.actionProvider.handleCancel();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Button variant="contained" onClick={handleProvideDetails}>
        Go to Donation Page
      </Button>
      <Button variant="contained" onClick={handleCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default DonateOptions;
