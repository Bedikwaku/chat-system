import { ChatMessage } from "../types/Message.js";

export interface DatabaseInterface {
  saveMessage(msg: ChatMessage): Promise<void>;
  getMessagesForUser(userId: string): Promise<ChatMessage[]>;
}

let implementation: DatabaseInterface | null = null;

export const setDatabaseImplementation = (impl: DatabaseInterface) => {
  implementation = impl;
};

export const saveMessage = async (msg: ChatMessage): Promise<void> => {
  if (!implementation) throw new Error("Database not initialized");
  return implementation.saveMessage(msg);
};

export const getMessagesForUser = async (
  userId: string
): Promise<ChatMessage[]> => {
  if (!implementation) throw new Error("Database not initialized");
  return implementation.getMessagesForUser(userId);
};
