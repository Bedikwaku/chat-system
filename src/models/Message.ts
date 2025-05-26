import { ChatMessage } from "../types/Message.js";
import * as db from "./Database.js";

export const saveMessage = (msg: ChatMessage) => db.saveMessage(msg);
export const getMessagesForUser = (userId: string) =>
  db.getMessagesForUser(userId);
