import { Logger } from "../objects/Logging/logger.js";
import { ChatMessage } from "../types/Message.js";

export interface QueueInterface {
  enqueueMessage(msg: ChatMessage): Promise<any>;
  pollMessages(): Promise<ChatMessage[]>;
}

let implementation: QueueInterface | null = null;

export const enqueueMessage = async (msg: ChatMessage): Promise<any> => {
  // Queue message for delivery
  if (!implementation) throw new Error("Queue not initialized");
  try {
    return implementation.enqueueMessage(msg);
  } catch (error) {
    console.error("Error queue message:", error);
    throw new Error("Failed to queue message");
  }
};

export const setQueueImplementation = (
  queueImplementation: QueueInterface
): void => {
  if (implementation) {
    Logger.warn("Database already initialized");
  }
  implementation = queueImplementation;
};

export const pollMessages = async (): Promise<ChatMessage[]> => {
  if (!implementation) throw new Error("Queue not initialized");
  try {
    return implementation.pollMessages();
  } catch (error) {
    console.error("Error polling messages:", error);
    throw new Error("Failed to poll messages");
  }
};
