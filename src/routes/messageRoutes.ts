import express from "express";
import { screenMessage } from "../middleware/screenMessage.js";
import { enqueueMessage } from "../services/queueService.js";
import { encrypt } from "../services/Cryptography/encryptionService.js";

const router = express.Router();

router.post("/", screenMessage, async (req, res) => {
  console.log("Received message:", req.body);
  const encrypted = encrypt(JSON.stringify(req.body));
  enqueueMessage(encrypted);
  res.status(202).json({ status: "Message received" });
});

export default router;
