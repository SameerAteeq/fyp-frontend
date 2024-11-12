// import { createChatBotMessage } from "react-chatbot-kit";

// import React, { useState } from "react";
// import Chatbot from "react-chatbot-kit";
// import "react-chatbot-kit/build/main.css";
// import { Button, Box, Stack, Typography } from "@mui/material";

// import Fab from "@mui/material/Fab";
// import ChatIcon from "@mui/icons-material/Chat";
// import CloseIcon from "@mui/icons-material/Close";
// import "../App.css";

// const FloatingChatBot = () => {
//   const [open, setOpen] = useState(false);

//   const toggleChat = () => setOpen(!open);
//   return (
//     <div>
//       {/* Floating button to open/close chatbot */}
//       {!open && (
//         <Fab
//           color="primary"
//           aria-label="chat"
//           onClick={toggleChat}
//           sx={{
//             position: "fixed",
//             bottom: 16,
//             right: 16,
//             zIndex: 1000,
//             backgroundColor: "primary.main",
//           }}
//         >
//           <ChatIcon />
//         </Fab>
//       )}
//       {/* Conditionally render the chatbot */}
//       {open && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "0px", // Position just above the button
//             right: "0px",
//             zIndex: 999,
//             width: "350px", // Adjust as per your design
//           }}
//         >
//           <Chatbot
//             config={config}
//             messageParser={MessageParser}
//             actionProvider={ActionProvider}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// class MessageParser {
//   constructor(actionProvider) {
//     this.actionProvider = actionProvider;
//   }

//   parse(message) {
//     const lowerCaseMessage = message.toLowerCase();

//     if (lowerCaseMessage.includes("donate")) {
//       this.actionProvider.handleDonate();
//     } else if (lowerCaseMessage.includes("get")) {
//       this.actionProvider.handleGetMedicine();
//     } else {
//       this.actionProvider.handleUnknown();
//     }
//   }
// }

// class ActionProvider {
//   constructor(createChatBotMessage, setStateFunc, createClientMessage) {
//     this.createChatBotMessage = createChatBotMessage;
//     this.setState = setStateFunc;
//     this.createClientMessage = createClientMessage;
//   }

//   handleDonate = () => {
//     const message = this.createChatBotMessage(
//       "Great! You can donate medicine by visiting our donation page.",
//       {
//         widget: "donateOptions",
//       }
//     );
//     this.updateChatbotState(message);
//   };

//   handleGetMedicine = () => {
//     const message = this.createChatBotMessage(
//       "Sure! You can find available medicines on our medicine catalog.",
//       {
//         widget: "getMedicineOptions",
//       }
//     );
//     this.updateChatbotState(message);
//   };

//   handleUnknown = () => {
//     const message = this.createChatBotMessage(
//       "I'm sorry, I didn't understand that. Could you please rephrase?"
//     );
//     this.updateChatbotState(message);
//   };

//   handleProvideDetails = () => {
//     const message = this.createChatBotMessage(
//       "Please provide your donation details.",
//       {
//         // You can add a form widget here
//       }
//     );
//     this.updateChatbotState(message);
//   };

//   handleCancel = () => {
//     const message = this.createChatBotMessage(
//       "Okay, let me know if you need anything else."
//     );
//     this.updateChatbotState(message);
//   };

//   updateChatbotState(message) {
//     this.setState((prevState) => ({
//       ...prevState,
//       messages: [...prevState.messages, message],
//     }));
//   }
// }

// const Options = (props) => {
//   const handleDonate = () => {
//     props.actionProvider.handleDonate();
//   };

//   const handleGetMedicine = () => {
//     props.actionProvider.handleGetMedicine();
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//       <Button variant="contained" onClick={handleDonate}>
//         Donate Medicine
//       </Button>
//       <Button variant="contained" onClick={handleGetMedicine}>
//         Get Medicine
//       </Button>
//     </Box>
//   );
// };

// const DonateOptions = (props) => {
//   const handleProvideDetails = () => {
//     props.actionProvider.handleProvideDetails();
//   };

//   const handleCancel = () => {
//     props.actionProvider.handleCancel();
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//       <Button variant="contained" onClick={handleProvideDetails}>
//         Provide Donation Details
//       </Button>
//       <Button variant="contained" onClick={handleCancel}>
//         Cancel
//       </Button>
//     </Box>
//   );
// };

// const GetMedicineOptions = (props) => {
//   const handleViewCatalog = () => {
//     // Implement navigation to medicine catalog
//     window.location.href = "/medicine-catalog"; // Example navigation
//   };

//   const handleCancel = () => {
//     props.actionProvider.handleCancel();
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//       <Button variant="contained" onClick={handleViewCatalog}>
//         View Medicine Catalog
//       </Button>
//       <Button variant="contained" onClick={handleCancel}>
//         Cancel
//       </Button>
//     </Box>
//   );
// };

// export default FloatingChatBot;

// FloatingChatBot.js
import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
// import "../App.css";

import chatConfig from "./chatConfig"; // Ensure you have a separate chatConfig.js
import MessageParser from "./messageParser";
import ActionProvider from "./actionProvider";

export const ChatbotContext = React.createContext();

const FloatingChatBot = () => {
  const [open, setOpen] = useState(false);

  const toggleChat = () => setOpen(!open);

  return (
    <ChatbotContext.Provider value={{ toggleChat }}>
      <div>
        {/* Floating button to open chatbot */}
        {!open && (
          <Fab
            color="primary"
            aria-label="chat"
            onClick={toggleChat}
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
              backgroundColor: "primary.main",
            }}
          >
            <ChatIcon />
          </Fab>
        )}
        {/* Conditionally render the chatbot */}
        {open && (
          <div
            style={{
              position: "fixed",
              bottom: "5px", // Position above the floating button
              right: "5px",
              zIndex: 999,
              width: "350px", // Adjust as per your design
            }}
          >
            <Chatbot
              config={chatConfig}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        )}
      </div>
    </ChatbotContext.Provider>
  );
};

export default FloatingChatBot;
