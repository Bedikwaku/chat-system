import { ChatMessage } from "../types/Message.js";

export interface Conversation {
  id: string; // Unique identifier for the conversation
  userIds: string[]; // Identifier for the users involved in the conversation
  messages: ChatMessage[]; // Array of messages in the conversation
  createdAt: number; // Timestamp when the conversation was created
  updatedAt?: number; // Optional, timestamp when the conversation was last updated
  status?: string; // Optional, e.g., "active", "archived"
}

export enum ConversationStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
  DELETED = "deleted",
}

export const addMessageToConversation = (
  conversation: Conversation,
  message: ChatMessage
): Conversation => {
  conversation.messages.push(message);
  conversation.updatedAt = Date.now(); // Update the last updated timestamp
  return conversation;
};
