export type ConversationChat = {
  id: number;
  messages: Message[];
  user_email: string;
  created_at: string;
  is_closed: boolean;
};

export type Message = {
  id: number;
  sender: string;
  content: string;
  created_at: string;
  conversation: number;
};

export type PayloadCreateConversation = {
  user_email: string;
  initial_message: string;
};

export type PayloadSendMessage = {
  sender: string;
  content: string;
  conversation: number;
};
