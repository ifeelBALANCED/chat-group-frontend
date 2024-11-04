export const enum WebSocketAction {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  GET_CHATS = 'GET_CHATS',
  CREATE_CHAT = 'CREATE_CHAT',
  SEND_MESSAGE = 'SEND_MESSAGE',
  GET_CHAT_MESSAGES = 'GET_CHAT_MESSAGES',
  ME = 'ME',
  GET_USERS = 'GET_USERS'
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

export interface SocketRequest<T = unknown> {
  action: string;
  data?: T;
}

export interface SocketOptions {
  reconnectDelay?: number;
  timeout?: number;
  pingInterval?: number;
  maxRetries?: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  nickname: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}