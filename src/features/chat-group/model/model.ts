import { createBooleanStore } from '@/shared/lib/create-modal-api';
import { createStore, sample } from 'effector';
import { and, not, or } from 'patronum';
import { User, WebSocketAction } from '@/shared/types';
import { createWebSocketHandler } from '@/shared/lib/create-websocket-handler';
import { ChatGroupGate, NewChatModalGate } from '@/entities/chat-group';
import { $chatGroups } from '@/entities/chat-groups';
import { redirectFx } from '@/shared/router';
import { createChatGroupHandler } from './create';
import { persist } from 'effector-storage/local';

export const sidebarVisibilityApi = createBooleanStore();

export const $isCreatingChat = createStore(false)
  .on(createChatGroupHandler.start, () => true)
  .reset([createChatGroupHandler.$data, createChatGroupHandler.$error]);

export const $newChatGroupId = createStore<string | null>(null)
  .on(createChatGroupHandler.$data, (_, chat) => chat.uuid)
  .reset(ChatGroupGate.close);

const userHandler = createWebSocketHandler({
  action: WebSocketAction.GET_USERS,
  initialState: [] as User[],
  transformData: (data: { users: User[] }) => data.users,
  withToken: true
});

export const $searchableMembers = userHandler.$data.map((users) => users.map((user) => ({
  id: user.user_uuid,
  label: user.email,
  value: user.email
})));

sample({
  clock: NewChatModalGate.open,
  target: userHandler.start
});

const $hasNoId = ChatGroupGate.state.map(({ id }) => !id);

const $chatGroupExists = sample({
  source: {
    chatGroups: $chatGroups,
    id: ChatGroupGate.state.map(({ id }) => id)
  },
  fn: ({ chatGroups, id }) => chatGroups.some((group) => group.uuid === id)
});

const $isNewChat = sample({
  source: {
    newChatId: $newChatGroupId,
    id: ChatGroupGate.state.map(({ id }) => id)
  },
  fn: ({ newChatId, id }) => newChatId === id
});

const $shouldRedirect = and(not($isCreatingChat), not($isNewChat), or($hasNoId, not($chatGroupExists)));

sample({
  clock: ChatGroupGate.state,
  source: $shouldRedirect,
  filter: Boolean,
  fn: () => '/chat-groups',
  target: redirectFx
});

persist({
  store: sidebarVisibilityApi.$value,
  key: 'sidebarOpened'
});