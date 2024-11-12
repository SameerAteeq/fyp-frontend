// MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("donate")) {
      this.actionProvider.handleDonate();
    } else if (lowerCaseMessage.includes("get")) {
      this.actionProvider.handleGetMedicine();
    } else if (
      lowerCaseMessage.includes("hi") ||
      lowerCaseMessage.includes("hello") ||
      lowerCaseMessage.includes("hey")
    ) {
      this.actionProvider.handleGreet();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default MessageParser;
