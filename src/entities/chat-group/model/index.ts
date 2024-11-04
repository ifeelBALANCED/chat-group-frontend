import { createModalApi } from '@/shared/lib/create-modal-api';
import { createGate } from 'effector-react';
import { createWebSocketHandler } from '@/shared/lib/create-websocket-handler';
import { ChatGroup, WebSocketAction } from '@/shared/types';

export const newChatModalApi = createModalApi();

export const NewChatModalGate = createGate('new chat modal');
export const ChatGroupGate = createGate<{ id?: string }>('chat group');

export const chatMessagesHandler = createWebSocketHandler({
  action: WebSocketAction.GET_CHAT_MESSAGES,
  initialState: [] as ChatGroup[],
  transformData: (data: { chats: ChatGroup[] }) => data.chats,
  withToken: true
});