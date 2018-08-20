const initState = {};

const connection = (state = initState, action) => {
  switch (action.type) {
    case 'CONN.SET_CONNECTION':
      return { ...state, socket: action.payload };
    default:
      return initState;
  }
};

export default connection;
