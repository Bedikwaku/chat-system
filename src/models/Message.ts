import { Logger } from "../objects/Logging/logger.js";
import { generateKey } from "../services/Cryptography/encryptionService.js";
import { ChatMessage } from "../types/Message.js";
import * as db from "./Database.js";

export const saveMessage = (msg: ChatMessage) => db.saveMessage(msg);

export function generateMessage(body: any): ChatMessage {
  Logger.debug("Generating message from body:", body);
  // const encryptedContent = encrypt(body.content);
  const message: ChatMessage = {
    id: generateKey(body.content, "msg-#"),
    conversationId: body.conversationId ?? generateKey(null, "conv-#"),
    status: MessageStatus.PENDING,
    lastUpdated: Date.now(),
    content: body.content,
    sender: body.sender,
    recepient: body.recepient,
    timestamp: Date.now(),
    requestId: generateKey(null, "req-#"),
  };
  Logger.debug("Generated message:", message);
  return message;
}

export enum MessageStatus {
  PENDING = "pending",
  QUEUED = "queued",
  FAILED = "failed",
  IN_PROGRESS = "in_progress",
  SUCCESS = "success",
}
