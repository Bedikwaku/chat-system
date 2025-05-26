import { ChatMessage } from "../types/Message.js";
import { decrypt } from "./Cryptography/encryptionService.js";
import { saveMessage } from "../models/Message.js";

const mockQueue: string[] = []; // Encrypted JSON strings
const deadLetterQueue: string[] = []; // For failed messages

export const enqueueMessage = (encrypted: string) => {
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
          console.warn("Message has no recipient, skipping:", msg);
          deadLetterQueue.push(encrypted);
          continue;
        } else if (!msg.content) {
          console.warn("Message has no content, skipping:", msg);
          deadLetterQueue.push(encrypted);
          continue;
        } else if (!msg.sender) {
          console.warn("Message has no sender, skipping:", msg);
          deadLetterQueue.push(encrypted);
          continue;
        }

        console.log("Processing message:", msg);
        // await saveMessage(msg);
      }
    }
  }, 2000);
};
