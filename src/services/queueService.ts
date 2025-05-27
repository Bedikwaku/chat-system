import { ChatMessage } from "../types/Message.js";
import { decrypt } from "./Cryptography/encryptionService.js";
import { MessageStatus, saveMessage } from "../models/Message.js";
import { Logger } from "../objects/Logging/logger.js";
import { processMessage } from "../controllers/messageController.js";
import { DatabaseInterface } from "../models/Database.js";

const mockDeliveryQueue: ChatMessage[] = []; // Encrypted JSON strings
const mockDeliveryQueueDLQ: ChatMessage[] = []; // For failed messages

export const enqueueMessage = async (message: ChatMessage) => {
  Logger.debug(`Enqueuing message. 
    MessageID: ${message.id}
    RequestID: ${message.requestId}`);
  message.status = MessageStatus.QUEUED;
  message.lastUpdated = Date.now(); // Set the current timestamp
  if (message.expiration && message.expiration < message.lastUpdated) {
    Logger.error("Message has expired, skipping:", message);
    message.status = MessageStatus.FAILED;
    mockDeliveryQueueDLQ.push(message);
    return;
  }
  mockDeliveryQueue.push(message);
};

export const pollMessages = async (): Promise<void> => {
  setInterval(async () => {
    while (mockDeliveryQueue.length) {
      const message = mockDeliveryQueue.shift();
      if (message) {
        // const raw = decrypt(encrypted.content);
        // const msg: ChatMessage = JSON.parse(raw);
        message.content = decrypt(message.content);
        const msg = message;
        msg.lastUpdated = Date.now(); // Set the current timestamp
        msg.status = MessageStatus.IN_PROGRESS;
        if (!msg.recepient) {
          Logger.warn("Message has no recipient, skipping:", msg);
          mockDeliveryQueueDLQ.push(message);
          continue;
        } else if (!msg.content) {
          Logger.warn("Message has no content, skipping:", msg);
          mockDeliveryQueueDLQ.push(message);
          continue;
        } else if (!msg.sender) {
          Logger.warn("Message has no sender, skipping:", msg);
          mockDeliveryQueueDLQ.push(message);
          continue;
        }

        Logger.debug("Processing message:", msg);
        await saveMessage(msg);
        let database: DatabaseInterface;
        const processedMessage = await processMessage(database, msg);
        return processedMessage;
      }
    }
  }, 2000);
};
