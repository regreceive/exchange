import io from 'socket.io-client';

const socket = io('http://localhost', {
  path: '/exchange',
  autoConnect: true,
});

export { socket };

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
