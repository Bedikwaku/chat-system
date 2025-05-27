import { MessageStatus } from "../models/Message.js";

export interface ChatMessage {
  requestId?: string;
  status?: MessageStatus; // e.g., "pending", "processed", "failed"
  conversationId?: string; // Optional, for grouping messages in a conversation
  id: string;
  content: string;
  recepient: string;
  sender: string;
  timestamp: number;
  expiration?: number; // Optional, for message expiration
  lastUpdated?: number; // Optional, for tracking updates
}
