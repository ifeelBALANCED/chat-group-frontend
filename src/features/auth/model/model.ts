import { createEffect, createEvent, sample } from 'effector';
import { loginForm, registerForm } from './form';
import {
  socketConnection,
  WebSocketErrorMessage,
  WebSocketMessage,
  WebSocketSuccessMessage
} from '@/shared/lib/create-socket-connection';
import {
  LoginDto, RegisterDto, User, WebSocketAction
} from '@/shared/types';
import { combineEvents } from 'patronum';
import { isWebSocketMessageError, isWebSocketMessageOk } from '@/shared/lib/type-guard';
import { AnyFormValues, Form } from 'effector-forms';
import { sessionModel } from '@/entities/session';
import { createWebSocketHandler } from '@/shared/lib/create-websocket-handler';

export const logoutClicked = createEvent('logout clicked');
export const clearCredentialsFx = createEffect(() =>
{
  // window.location.reload();
  window.localStorage.clear();
});

export const userHandler = createWebSocketHandler({
  action: WebSocketAction.ME,
  initialState: {} as User,
  transformData: (user) => user,
  withToken: true
});

const handleWebSocketFormAction = <T extends AnyFormValues>(
  form: Form<T>,
  action: WebSocketAction
) => sample({
    clock: form.submit,
    filter: form.$isValid,
    source: form.$values,
    fn: (data) => ({ action, data }),
    target: socketConnection.handleSentMessageFx
  });

handleWebSocketFormAction(loginForm, WebSocketAction.LOGIN);
handleWebSocketFormAction(registerForm, WebSocketAction.REGISTER);

export const $authProcessing = socketConnection.handleSentMessageFx.pending;

sample({
  clock: combineEvents({
    events: [loginForm.formValidated, socketConnection.messageReceived]
  }),
  filter: (payload: [LoginDto, WebSocketMessage]): payload is [LoginDto, WebSocketErrorMessage] =>
  {
    const [, message] = payload;
    return isWebSocketMessageError(message);
  },
  fn: ([, message]: [LoginDto, WebSocketErrorMessage]) => ({
    rule: 'backend-error' as const,
    errorText: message.error.detail
  }),
  target: loginForm.fields.email.addError
});

sample({
  clock: combineEvents({
    events: [registerForm.formValidated, socketConnection.messageReceived]
  }),
  filter: (payload: [RegisterDto, WebSocketMessage]): payload is [RegisterDto, WebSocketErrorMessage] =>
  {
    const [, message] = payload;
    return isWebSocketMessageError(message);
  },
  fn: ([, message]: [RegisterDto, WebSocketErrorMessage]) => ({
    rule: 'backend-error' as const,
    errorText: message.error.detail
  }),
  target: registerForm.fields.email.addError
});

sample({
  clock: socketConnection.messageReceived,
  filter: (payload: WebSocketMessage): payload is WebSocketSuccessMessage => isWebSocketMessageOk(payload) && Boolean(payload.data.access_token),
  fn: (message) => message.data.access_token,
  target: [sessionModel.$token, userHandler.start, loginForm.reset, registerForm.reset]
});

sample({
  clock: userHandler.$data,
  filter: Boolean,
  target: sessionModel.$user
});

sample({
  clock: logoutClicked,
  source: sessionModel.$token,
  filter: Boolean,
  fn: (token) => ({ action: WebSocketAction.LOGOUT, data: { token } }),
  target: [socketConnection.handleSentMessageFx, clearCredentialsFx, sessionModel.$token.reinit]
});