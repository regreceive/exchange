import findIndex from 'lodash/findIndex';
import { addEventListener } from 'consolidated-events';

import ReconnectingWebSocket from './lib/re-websocket';

const subscribers = [];
const handles = new Map();
let connected = false;
let forceClosed = false;
const WS_URL = process.env.REACT_APP_WS;
let socket;

export function subscribe(data) {
  if (subscribers.some(({ sub }) => sub === data.sub)) {
    return;
  }

  subscribers.push(data);
  if (connected) {
    socket.send(JSON.stringify(data));
  }
}

export function switches(data) {
  const [, , switchChannel] = data.sub.split('.');
  for (let subscriber of subscribers) {
    const [, , channel] = subscriber.sub.split('.');
    // 在一个channel上，就替换
    if (switchChannel === channel) {
      unsubscribe(subscriber);
      subscribe(data);
      return;
    }
  }
}

export function unsubscribe(data) {
  const index = findIndex(subscribers, { sub: data.sub });
  if (index > -1 && connected) {
    subscribers.splice(index, 1);
    const unsub = { ...data, unsub: data.sub };
    delete unsub.sub;
    socket.send(JSON.stringify(unsub));
  }
}

export function on(type, fn) {
  handles.set(type, fn);
  return { on };
}

export function off(type) {
  handles.delete(type);
}

export function close() {
  if (connected) {
    forceClosed = true;
    connected = false;
    socket.close();
  }
}

function handle(data) {
  const [, symbol, channel, ...extraArgs] = data.ch.split('.');
  if (handles.has(channel)) {
    handles.get(channel)(symbol, extraArgs, data);
  }
}

export function createWebSocketConnection() {
  socket = new ReconnectingWebSocket(WS_URL);

  const removeOpen = addEventListener(socket, 'open', () => {
    for (let sub of subscribers.values()) {
      socket.send(JSON.stringify(sub));
    }
    connected = true;
  });

  const removeClose = addEventListener(socket, 'close', () => {
    if (forceClosed) {
      removeOpen();
      removeClose();
      removeMessage();
      socket = null;
      return;
    }
    connected = false;
  });

  const removeMessage = addEventListener(socket, 'message', ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.tick) {
      handle(msg);
    }
  });
}
