import io from 'socket.io-client';

export function createWebSocketConnection() {
  return io('ws://localhost:8000', {
    path: '/exchange',
    autoConnect: true,
  });
}

/*
export function subscribe(name) {
  // subscriber.push(name);
  socket.emit('subscribe', name);
  socket.on(name, data => {
    store.dispatch(actions[name](data));
  });
}

export function unsubscribe(name) {
  socket.emit('unsubscribe', name);
  socket.off(name);
}
*/
