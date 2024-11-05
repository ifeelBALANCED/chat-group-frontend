import {
  createWebSocketHandler,
  createWebSocketHandlerWithData
} from '@/shared/lib/create-websocket-handler';
import { ChatGroup, WebSocketAction } from '@/shared/types';
import { sample } from 'effector';
import { createChatMessageForm, searchUserForm } from '@/features/chat-group/model/form';
import { redirectFx } from '@/shared/router';
import { ChatGroupGate, chatMessagesHandler, newChatModalApi } from '@/entities/chat-group';
import { chatGroupsHandler } from '@/entities/chat-groups';
import { ChatGroupMessage } from '@/shared/types/chat.types';
import { sessionModel } from '@/entities/session';
import { spread } from 'patronum';
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
    uuid: ChatGroupGate.state.map((state) => state.id),
    token: sessionModel.$token
  },
  filter: ({ values, uuid }) => Boolean(values.content && uuid),
  fn: ({ uuid, values, token }) => ({
    createChatMessage: {
      chat_uuid: String(uuid),
      content: values.content
    },
    chatMessages: {
      chat_uuid: String(uuid),
      token: String(token)
    }
  }),
  target: [
    createChatMessageForm.reset,
    spread({
      createChatMessage: createChatMessageHandler.start,
      chatMessages: chatMessagesHandler.start
    })
  ]
});

sample({
  clock: socketConnection.messageReceived,
  source: sessionModel.$token,
  filter: (_, message) => message.action === WebSocketAction.NEW_MESSAGE_RECEIVED && Object.hasOwn(message, 'data'),
  fn: (token, message) => ({
    chat_uuid: String((message as WebSocketSuccessMessage).data.chat_uuid),
    token: String(token)
  }),
  target: chatMessagesHandler.start
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