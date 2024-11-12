class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleDonate = () => {
    const message = this.createChatBotMessage(
      "Great! You can donate medicine by visiting our donation page.",
      {
        widget: "donateOptions",
      }
    );
    this.updateChatbotState(message);
  };

  handleGetMedicine = () => {
    const message = this.createChatBotMessage(
      "Sure! You can find available medicines on our medicine catalog.",
      {
        widget: "getMedicineOptions",
      }
    );
    this.updateChatbotState(message);
  };

  handleUnknown = () => {
    const message = this.createChatBotMessage(
      "I'm sorry, I didn't understand that. Could you please rephrase?"
    );
    this.updateChatbotState(message);
  };

  handleGreet = () => {
    const message = this.createChatBotMessage(
      "Hello! I'm MedBot. How can I assist you today?"
    );
    this.updateChatbotState(message);
  };

  handleProvideDetails = () => {
    const message = this.createChatBotMessage(
      "Please provide your donation details."
      // You can add a form widget here
    );
    this.updateChatbotState(message);
  };

  handleCancel = () => {
    const message = this.createChatBotMessage(
      "Okay, let me know if you need anything else."
    );
    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
