export function setConnection(socket) {
  return {
    type: 'CONN.SET_CONNECTION',
    payload: socket,
  };
}

export function createNewConnectionInstance() {
  return {
    type: 'CONNECTION.CREATE_NEW_CONNECTION',
  };
}
