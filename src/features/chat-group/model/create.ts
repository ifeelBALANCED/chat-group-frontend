import { createWebSocketHandlerWithData } from '@/shared/lib/create-websocket-handler';
import { ChatGroup, WebSocketAction } from '@/shared/types';
import { sample } from 'effector';
import { searchUserForm } from '@/features/chat-group/model/form';
import { redirectFx } from '@/shared/router';
import { newChatModalApi } from '@/entities/chat-group';
import { chatGroupsHandler } from '@/entities/chat-groups';

export const createChatGroupHandler = createWebSocketHandlerWithData({
  action: WebSocketAction.CREATE_CHAT,
  initialState: {} as ChatGroup,
  transformData: (data: ChatGroup) => data,
  transformPayload: ({ participant_email }: { participant_email: string }) => ({
    participant_email
  }),
  withToken: true
});

sample({
  clock: searchUserForm.formValidated,
  source: searchUserForm.$values,
  filter: (values) => Boolean(values.user),
  fn: (values) => ({
    participant_email: values.user
  }),
  target: createChatGroupHandler.start
});

const chatGroupCreated = sample({
  clock: createChatGroupHandler.$data,
  filter: (chatGroup) => Boolean(chatGroup.uuid)
});

sample({
  clock: chatGroupCreated,
  target: [newChatModalApi.modalClosed, chatGroupsHandler.start]
});

sample({
  clock: newChatModalApi.modalClosed,
  source: chatGroupCreated,
  fn: (chatGroup) => `/chat-groups/${chatGroup.uuid}`,
  target: redirectFx
});

sample({
  clock: newChatModalApi.modalClosed,
  target: searchUserForm.reset
});