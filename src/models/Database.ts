import { ChatMessage } from "../types/Message.js";

export interface DatabaseInterface {
  saveMessage(msg: ChatMessage): Promise<void>;
  // getMessagesForUser(userId: string): Promise<ChatMessage[]>;
}

let implementation: DatabaseInterface | null = null;

export const saveMessage = async (msg: ChatMessage): Promise<void> => {
  // Sometimes the message queue needs to be flushed
  // when we receive a message, before we send a success response
  // we enqueue the message and save it to the database
  if (!implementation) throw new Error("Database not initialized");
  return implementation.saveMessage(msg);
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
