// config.js
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./options";
import DonateOptions from "./donateOption";
import GetMedicineOptions from "./getMedicineOptions";
import CustomHeader from "./customHeader"; // Import the custom header

const chatConfig = {
  initialMessages: [
    createChatBotMessage("Hello! I'm MedBot. How can I assist you today?", {
      widget: "options",
    }),
  ],
  botName: "MedBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#58869e",
    },
    chatButton: {
      backgroundColor: "#58869e",
    },
  },
  customComponents: {
    header: (props) => <CustomHeader {...props} />, // Use the custom header
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "donateOptions",
      widgetFunc: (props) => <DonateOptions {...props} />,
    },
    {
      widgetName: "getMedicineOptions",
      widgetFunc: (props) => <GetMedicineOptions {...props} />,
    },
    // Add more widgets as needed
  ],
};

export default chatConfig;
