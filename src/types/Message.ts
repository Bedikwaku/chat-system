export interface ChatMessage {
  requestId?: string;
  id: string;
  content: string;
  recepient: string;
  sender: string;
  timestamp: number;
}
