import express from "express";
import { screenMessage } from "../middleware/screenMessage.js";
import { enqueueMessage } from "../services/queueService.js";
import {
  encrypt,
  generateKey,
} from "../services/Cryptography/encryptionService.js";
import { saveMessage } from "../models/Database.js";
import { ChatMessage } from "../types/Message.js";
import { Logger } from "../objects/Logging/logger.js";

const router = express.Router();

router.post("/", screenMessage, async (req, res) => {
  Logger.log("Received message:", req.body);
  const encrypted = encrypt(JSON.stringify(req.body));
  const message = generateMessage(req.body);
  const promiseArray = [enqueueMessage(encrypted), saveMessage(req.body)];
  await Promise.all(promiseArray);
  res.status(202).json({
    status: "Message received",
    requestId: message.requestId,
  });
});

function generateMessage(body: any): ChatMessage {
  Logger.log("Generating message from body:", body);
  return {
    id: body.id || crypto.randomUUID(),
    content: body.content,
    sender: body.sender,
    recepient: body.recepient,
    timestamp: Date.now(),
    requestId: generateKey(null, "req-#"),
  };
}

export default router;
