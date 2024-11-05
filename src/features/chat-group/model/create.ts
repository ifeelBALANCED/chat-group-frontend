import {
  createWebSocketHandler,
  createWebSocketHandlerWithData
} from '@/shared/lib/create-websocket-handler';
import { ChatGroup, WebSocketAction } from '@/shared/types';
import { sample } from 'effector';
import { createChatMessageForm, searchUserForm } from '@/features/chat-group/model/form';
import { redirectFx } from '@/shared/router';
import { $chatGroupMessages, ChatGroupGate, newChatModalApi } from '@/entities/chat-group';
import { chatGroupsHandler } from '@/entities/chat-groups';
import { ChatGroupMessage } from '@/shared/types/chat.types';
import { socketConnection, WebSocketSuccessMessage } from '@/shared/lib/create-socket-connection';

export const createChatGroupHandler = createWebSocketHandlerWithData({
  action: WebSocketAction.CREATE_CHAT,
  initialState: {} as ChatGroup,
  transformData: (data: ChatGroup) => data,
  transformPayload: ({ participant_email }: { participant_email: string }) => ({
    participant_email
  }),
  withToken: true
});

export const newChatMessageHandler = createWebSocketHandler({
  action: WebSocketAction.NEW_MESSAGE_RECEIVED,
  initialState: {} as ChatGroupMessage,
  transformData: (data) => data,
  transformPayload: ({ chat_uuid }: { chat_uuid: string }) => ({
    chat_uuid
  })
});

export const createChatMessageHandler = createWebSocketHandlerWithData({
  action: WebSocketAction.SEND_MESSAGE,
  initialState: {} as ChatGroupMessage,
  transformData: (createdMessage: ChatGroupMessage) => createdMessage,
  transformPayload: ({ chat_uuid, content }) => ({
    chat_uuid,
    content
  }),
  withToken: true
});

sample({
  clock: createChatMessageForm.formValidated,
  source: {
    values: createChatMessageForm.$values,
    uuid: ChatGroupGate.state.map((state) => state.id)
  },
  filter: ({ values, uuid }) => Boolean(values.content && uuid),
  fn: ({ uuid, values }) => ({
    chat_uuid: String(uuid),
    content: values.content
  }),
  target: [createChatMessageForm.reset, createChatMessageHandler.start]
});

sample({
  clock: createChatMessageHandler.$data,
  source: $chatGroupMessages,
  filter: Boolean,
  fn: (messages, message) => [...messages, message],
  target: $chatGroupMessages
});

sample({
  clock: socketConnection.messageReceived,
  source: $chatGroupMessages,
  filter: (_, message) => message.action === WebSocketAction.NEW_MESSAGE_RECEIVED && Object.hasOwn(message, 'data'),
  fn: (messages, message) => [...messages, (message as WebSocketSuccessMessage).data],
  target: $chatGroupMessages
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