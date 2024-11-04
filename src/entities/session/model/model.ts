import { socketConnection } from '@/shared/lib/create-socket-connection';
import { createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';

export const $token = createStore<string | null>(null);
export const $isAuthenticated = createStore(false);

sample({
  source: [
    $token.map(Boolean),
    socketConnection.$connectionStatus.map((status) => status === 'connected')
  ] as const,
  fn: ([token, connected]) => token && connected,
  target: $isAuthenticated
});

persist({
  store: $token,
  key: 'token'
});

persist({
  store: $isAuthenticated,
  key: 'authenticated'
});