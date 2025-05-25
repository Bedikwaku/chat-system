import { ChatMessage } from "../types/Message.js";
import * as db from "./iDatabase.js";

export const saveMessage = (msg: ChatMessage) => db.saveMessage(msg);
export const getMessagesForUser = (userId: string) =>
  db.getMessagesForUser(userId);
