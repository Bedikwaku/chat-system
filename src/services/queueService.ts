import { ChatMessage } from "../types/Message.js";
import { decrypt } from "./Cryptography/encryptionService.js";
import { saveMessage } from "../models/Message.js";
import { Logger } from "../objects/Logging/logger.js";

const mockQueue: string[] = []; // Encrypted JSON strings
const deadLetterQueue: string[] = []; // For failed messages

export const enqueueMessage = async (encrypted: string) => {
  mockQueue.push(encrypted);
};

export const pollMessages = async (): Promise<void> => {
  setInterval(async () => {
    while (mockQueue.length) {
      const encrypted = mockQueue.shift();
      if (encrypted) {
        const raw = decrypt(encrypted);
        const msg: ChatMessage = JSON.parse(raw);
        msg.id = crypto.randomUUID(); // Generate a new ID for the message
        msg.timestamp = Date.now(); // Set the current timestamp
        if (!msg.recepient) {
          Logger.warn("Message has no recipient, skipping:", msg);
          deadLetterQueue.push(encrypted);
          continue;
        } else if (!msg.content) {
          Logger.warn("Message has no content, skipping:", msg);
          deadLetterQueue.push(encrypted);
          continue;
        } else if (!msg.sender) {
          Logger.warn("Message has no sender, skipping:", msg);
          deadLetterQueue.push(encrypted);
          continue;
        }

        Logger.log("Processing message:", msg);
        // await saveMessage(msg);
      }
    }
  }, 2000);
};
