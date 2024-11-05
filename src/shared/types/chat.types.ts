export type ChatGroup = {
  uuid: string;
  participants: string[];
  created_at: string;
  display_name: string;
};

export type CreateChatGroup = {
  participant_email: string;
};

export type ChatGroupMessage = {
  id: number;
  chat_uuid: string;
  sender_uuid: string;
  sender_nickname: string;
  content: string;
  sent_at: string;
};