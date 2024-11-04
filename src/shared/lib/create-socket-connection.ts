import {
  attach, createEffect, createEvent, createStore, sample
} from 'effector';
import {
  ConnectionStatus,
  SocketOptions,
  SocketRequest,
  WebSocketAction
} from '@/shared/types/socket.types';
import { WS_URL } from '@/shared/env';

export type WebSocketSuccessMessage = {
  action: keyof typeof WebSocketAction;
  status: 'OK';
  data: any;
};

export type WebSocketErrorMessage = {
  action: keyof typeof WebSocketAction;
  status: 'ERROR';
  error: {
    detail: string;
    field: string;
  };
};

export type WebSocketMessage = WebSocketSuccessMessage | WebSocketErrorMessage;

export const createSocketConnection = (connectionUrl: string, options: SocketOptions = {}) =>
{
  const { timeout = 5000 } = options;

  const socketConnected = createEvent();
  const socketDisconnected = createEvent();
  const socketError = createEvent<string>();
  const messageReceived = createEvent<WebSocketMessage>();

  const $socket = createStore<WebSocket | null>(null);
  const $connectionStatus = createStore<ConnectionStatus>('disconnected');
  const $connectionError = createStore<string | null>(null);

  const createSocketFx = createEffect<void, WebSocket, Error>(() =>
  {
    const socket = new WebSocket(connectionUrl);

    return new Promise<WebSocket>((resolve, reject) =>
    {
      const timeoutId = setTimeout(() =>
      {
        socket.close();
        reject(new Error('Connection timeout'));
      }, timeout);

      socket.onopen = () =>
      {
        clearTimeout(timeoutId);
        socketConnected();
        resolve(socket);
      };

      socket.onclose = () =>
      {
        socketDisconnected();
      };

      socket.onerror = () =>
      {
        socketError('WebSocket connection error');
        reject(new Error('WebSocket connection error'));
      };

      socket.onmessage = (event: MessageEvent) =>
      {
        try
        {
          const data = JSON.parse(event.data || '{}') as WebSocketMessage;
          console.log('data', data);
          messageReceived(data);
        }
        catch
        {
          messageReceived(event.data as WebSocketMessage);
        }
      };
    });
  });

  const initializeSocket = createEffect<void, WebSocket, Error>(async () => createSocketFx());

  const disconnectSocket = attach({
    source: $socket,
    effect: createEffect((socket: WebSocket | null) =>
    {
      if(socket)
      {
        socket.close();
      }
    })
  });

  type SendMessageParams = {
    socket: WebSocket;
    request: SocketRequest;
  };

  const sendMessageOriginalFx = createEffect<
    SendMessageParams,
    { success: true; action: string },
    Error
  >(async ({ socket, request }) => new Promise((resolve, reject) =>
  {
    if(socket.readyState !== WebSocket.OPEN)
    {
      reject(new Error('Socket is not connected'));
      return;
    }

    const timeoutId = setTimeout(() =>
    {
      reject(new Error(`Request timeout for action: ${request.action}`));
    }, timeout);

    try
    {
      socket.send(JSON.stringify({
        action: request.action,
        data: request.data
      }));
      clearTimeout(timeoutId);
      resolve({
        success: true,
        action: request.action
      });
    }
    catch (error)
    {
      clearTimeout(timeoutId);
      reject(error instanceof Error ? error : new Error('Failed to send message'));
    }
  }));

  const handleSentMessageFx = attach({
    source: $socket,
    effect: sendMessageOriginalFx,
    mapParams: (request: SocketRequest, socket) =>
    {
      if(!socket)
      {
        throw new Error('Socket is not initialized');
      }
      return { request, socket };
    }
  });

  // Type-safe sampling
  sample({
    clock: createSocketFx.doneData,
    target: $socket
  });

  sample({
    clock: socketConnected,
    fn: (): ConnectionStatus => 'connected',
    target: $connectionStatus
  });

  sample({
    clock: socketDisconnected,
    fn: (): ConnectionStatus => 'disconnected',
    target: $connectionStatus
  });

  sample({
    clock: initializeSocket,
    fn: (): ConnectionStatus => 'connecting',
    target: $connectionStatus
  });

  sample({
    clock: socketError,
    target: $connectionError
  });

  sample({
    clock: socketDisconnected,
    fn: () => null,
    target: $socket
  });

  sample({
    clock: initializeSocket,
    fn: () => null,
    target: $connectionError
  });

  return {
    $socket,
    $connectionStatus,
    $connectionError,
    initializeSocket,
    disconnectSocket,
    handleSentMessageFx,
    messageReceived
  };
};

export const socketConnection = createSocketConnection(WS_URL);