// CustomHeader.js
import React, { useContext } from "react";
import { Stack, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ChatbotContext } from "./chatBot"; // Import the context

const CustomHeader = () => {
  const { toggleChat } = useContext(ChatbotContext); // Consume the context

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ padding: 1, pr: 0, backgroundColor: "#58869e" }}
    >
      <Typography variant="body1" color="#fff">
        Helping Hands
      </Typography>
      <Button variant="text" onClick={toggleChat}>
        <CloseIcon sx={{ color: "#fff" }} />
      </Button>
    </Stack>
  );
};

export default CustomHeader;
