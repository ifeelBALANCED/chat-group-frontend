import {
  socketConnection,
  WebSocketMessage,
  WebSocketSuccessMessage
} from '@/shared/lib/create-socket-connection';
import { WebSocketAction } from '@/shared/types';
import { isWebSocketMessageOk } from '@/shared/lib/type-guard';
import {
  createEvent, createStore, EventCallable, sample, StoreWritable
} from 'effector';
import { sessionModel } from '@/entities/session';

type WebSocketDataHandler<T, P = void> = {
  $data: StoreWritable<T>;
  $loading: StoreWritable<boolean>;
  $error: StoreWritable<string | null>;
  start: EventCallable<P>;
  reset: EventCallable<void>;
};

type TransformPayloadFn<P> = P extends void
  ? () => Record<string, unknown>
  : (payload: P) => Record<string, unknown>;

interface CreateWebSocketHandlerParams<T, P = void> {
  action: WebSocketAction;
  initialState: T;
  filterMessage?: (message: WebSocketSuccessMessage) => boolean;
  transformData?: (data: any) => T;
  transformPayload?: TransformPayloadFn<P>;
  withToken?: boolean;
}

export const createWebSocketHandler = <T, P = void>({
  action,
  initialState,
  filterMessage = () => true,
  transformData = (data: unknown) => data as T,
  transformPayload = (() => ({})) as TransformPayloadFn<P>,
  withToken = false
}: CreateWebSocketHandlerParams<T, P>): WebSocketDataHandler<T, P> =>
{
  const reset = createEvent();
  const start = createEvent<P>();

  const $data = createStore<T>(initialState).reset(reset);
  const $loading = createStore(false).reset(reset);
  const $error = createStore<string | null>(null).reset(reset);

  sample({
    clock: start,
    source: sessionModel.$token,
    filter: Boolean,
    fn: (token, payload) => ({
      action,
      data: {
        ...transformPayload(payload),
        ...withToken && token ? { token } : {}
      }
    }),
    target: socketConnection.handleSentMessageFx
  });

  sample({
    clock: start,
    fn: () => true,
    target: $loading
  });

  sample({
    clock: socketConnection.messageReceived,
    filter: (message: WebSocketMessage): message is WebSocketSuccessMessage => isWebSocketMessageOk(message) && filterMessage(message),
    fn: (message) => transformData(message.data),
    target: $data
  });

  sample({
    clock: socketConnection.messageReceived,
    filter: (message: WebSocketMessage) => isWebSocketMessageOk(message),
    fn: () => false,
    target: $loading
  });

  sample({
    clock: socketConnection.handleSentMessageFx.failData,
    fn: (error: { message: string }) => error.message,
    target: $error
  });

  sample({
    clock: socketConnection.handleSentMessageFx.fail,
    fn: () => false,
    target: $loading
  });

  return {
    $data,
    $loading,
    $error,
    start,
    reset
  };
};

export const createWebSocketHandlerWithData = <T, P extends Record<string, unknown>>({
  action,
  initialState,
  transformPayload,
  withToken = false,
  ...rest
}: Omit<CreateWebSocketHandlerParams<T, P>, 'transformPayload'> & {
  transformPayload: TransformPayloadFn<P>;
  withToken?: boolean;
}) => createWebSocketHandler<T, P>({
  action,
  initialState,
  transformPayload,
  withToken,
  ...rest
});