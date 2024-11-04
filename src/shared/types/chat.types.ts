export type ChatGroup = {
  uuid: string;
  participants: string[];
  created_at: string;
  display_name: string;
};

export type CreateChatGroup = {
  participant_email: string;
};

// export type ChatGroupMessage = {};