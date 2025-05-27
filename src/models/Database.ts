import { ChatMessage } from "../types/Message.js";

export interface DatabaseInterface {
  saveMessage(msg: ChatMessage): Promise<any>;
  getConversation(conversationId: string): Promise<any>;
  // getMessagesForUser(userId: string): Promise<ChatMessage[]>;
}

let implementation: DatabaseInterface | null = null;

export const saveMessage = async (msg: ChatMessage): Promise<any> => {
  // Sometimes the message queue needs to be flushed
  // when we receive a message, before we send a success response
  // we enqueue the message and save it to the database
  if (!implementation) throw new Error("Database not initialized");
  try {
    return implementation.saveMessage(msg);
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("Failed to save message");
  }
};

export const getConversation = async (conversationId: string): Promise<any> => {
  if (!implementation) throw new Error("Database not initialized");
  try {
    return implementation.getConversation(conversationId);
  } catch (error) {
    console.error("Error getting conversation:", error);
    throw new Error("Failed to get conversation");
  }
};

export const setDatabaseImplementation = (
  dbImplementation: DatabaseInterface
): void => {
  if (implementation) {
    throw new Error("Database already initialized");
  }
  implementation = dbImplementation;
};
// export const getMessagesForUser = async (
//   userId: string
// ): Promise<ChatMessage[]> => {
//   if (!implementation) throw new Error("Database not initialized");
//   return implementation.getMessagesForUser(userId);
// };
