import io from 'socket.io-client';

export function createWebSocketConnection() {
  return io('ws://localhost:8000', {
    path: '/exchange',
    autoConnect: true,
  });
}
