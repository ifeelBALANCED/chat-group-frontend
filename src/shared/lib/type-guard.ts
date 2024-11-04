import type {
  WebSocketErrorMessage,
  WebSocketMessage,
  WebSocketSuccessMessage
} from './create-socket-connection';

export const isWebSocketMessageOk = (message: WebSocketMessage): message is WebSocketSuccessMessage => message.status === 'OK' && Object.hasOwn(message, 'data');

export const isWebSocketMessageError = (message: WebSocketMessage): message is WebSocketErrorMessage => message.status === 'ERROR' && Object.hasOwn(message, 'error');