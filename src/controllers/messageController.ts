import {
  addMessageToConversation,
  Conversation,
  ConversationStatus,
} from "../models/Conversation.js";
import { DatabaseInterface } from "../models/Database.js";
import { MessageStatus } from "../models/Message.js";
import { Logger } from "../objects/Logging/logger.js";
import { ChatMessage } from "../types/Message.js";

export const processMessage = async (
  database: DatabaseInterface,
  message: ChatMessage
) => {
  try {
    Logger.debug("Processing message:", message.id);
    if (!database) {
      Logger.warn("Database not implemented, mocking message processing");
      const mockConversation: Conversation = {
        id: message.conversationId,
        messages: [],
        userIds: [message.sender, message.recepient],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: ConversationStatus.ACTIVE,
      };
      Logger.debug("Mock conversation created:", mockConversation.id);

      message.status = MessageStatus.SUCCESS; // Update message status to success
      message.lastUpdated = Date.now(); // Update last updated timestamp
      addMessageToConversation(mockConversation, message);
      // await database.saveMessage(message); // Save the updated message
      Logger.debug("Message processed successfully in mock:", message);

      return message; // Return the processed message
    } else {
      const conversation = await database.getConversation(
        message.conversationId
      );
      addMessageToConversation(conversation, message);
      message.status = MessageStatus.SUCCESS; // Update message status to success
      message.lastUpdated = Date.now(); // Update last updated timestamp
      await database.saveMessage(message); // Save the updated message
      Logger.debug("Message processed successfully:", message.id);
      return message; // Return the processed message
    }
  } catch (error) {
    Logger.error("Error processing message:", error);
    throw error; // Re-throw the error for further handling
  }
};
