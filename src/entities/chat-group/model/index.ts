import { createModalApi } from '@/shared/lib/create-modal-api';
import { createGate } from 'effector-react';
import { createWebSocketHandler } from '@/shared/lib/create-websocket-handler';
import { WebSocketAction } from '@/shared/types';
import { ChatGroupMessage } from '@/shared/types/chat.types';
import { createEvent, restore, sample } from 'effector';
import { sessionModel } from '@/entities/session';
import { persist } from 'effector-storage/local';

type ChatMessagesPayload = {
  token: string;
  chat_uuid: string;
};

export const newActiveGroupSet = createEvent<string | null>('new active group set');
export const newChatModalApi = createModalApi();
export const $activeChatGroup = restore(newActiveGroupSet, null);
export const NewChatModalGate = createGate('new chat modal');
export const ChatGroupGate = createGate<{ id?: string }>('chat group');

export const chatMessagesHandler = createWebSocketHandler<ChatGroupMessage[], ChatMessagesPayload>({
  action: WebSocketAction.GET_CHAT_MESSAGES,
  initialState: [] as ChatGroupMessage[],
  transformData: (chats: ChatGroupMessage[]) => chats,
  transformPayload: ({ token, chat_uuid }) => ({
    token,
    chat_uuid
  })
});

export const $chatGroupMessages = chatMessagesHandler.$data;

sample({
  clock: ChatGroupGate.state,
  source: {
    token: sessionModel.$token,
    uuid: ChatGroupGate.state.map((state) => state.id)
  },
  filter: ({ token, uuid }) => Boolean(token && uuid),
  fn: ({ token, uuid }) => ({
    token: String(token),
    chat_uuid: String(uuid)
  }),
  target: chatMessagesHandler.start
});

persist({
  store: $activeChatGroup,
  key: 'active-chat-group'
});

persist({
  store: $chatGroupMessages,
  key: 'chat-group-messages'
});