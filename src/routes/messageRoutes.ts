import express from "express";
import { screenMessage } from "../middleware/screenMessage.js";
import { enqueueMessage } from "../services/queueService.js";
import { encrypt } from "../services/Cryptography/encryptionService.js";
import { saveMessage } from "../models/Database.js";
import { Logger } from "../objects/Logging/logger.js";
import { generateMessage } from "../models/Message.js";

const router = express.Router();

router.post("/", screenMessage, async (req, res) => {
  Logger.debug("Received message:", req.body);
  const message = generateMessage(req.body);
  const requestId = message.requestId;
  message.content = encrypt(message.content);
  await enqueueMessage(message)
    .then(() => {
      saveMessage(message)
        .then(() => {
          Logger.debug("Message enqueued and saved to database:", message);
          return res.status(202).json({
            status: "Message enqueued and saved to database",
            requestId: requestId,
            messageId: message.id,
            content: message.content,
            sender: message.sender,
            recepient: message.recepient,
            timestamp: message.timestamp,
            lastUpdated: message.lastUpdated,
            messageStatus: message.status,
            expiration: message.expiration,
          });
        })
        .catch((error) => {
          Logger.error("Failed to save message:", error);
          return res.status(500).json({
            status: "Failed to save message database. Message may be enqueued.",
            requestId: requestId,
          });
        });
    })
    .catch((error) => {
      Logger.error("Failed to enqueue message:", error);
      return res.status(500).json({
        status: "Failed to enqueue message",
        requestId: requestId,
      });
    });
});

export default router;
