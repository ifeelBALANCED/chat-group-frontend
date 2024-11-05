import { createWebSocketHandler } from '@/shared/lib/create-websocket-handler';
import { ChatGroup, WebSocketAction } from '@/shared/types';
import { createGate } from 'effector-react';
import { sample } from 'effector';
import { persist } from 'effector-storage/local';

export const ChatGroupsGate = createGate();

export const chatGroupsHandler = createWebSocketHandler({
  action: WebSocketAction.GET_CHATS,
  initialState: [] as ChatGroup[],
  transformData: (data: { chats: ChatGroup[] }) => data.chats,
  withToken: true
});

export const $chatGroups = chatGroupsHandler.$data;

sample({
  source: ChatGroupsGate.open,
  target: chatGroupsHandler.start
});

persist({
  store: $chatGroups,
  key: 'chatGroups'
});