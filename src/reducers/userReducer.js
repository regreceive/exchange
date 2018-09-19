const initState = {
  assets: {
    usdt: 0,
    btc: 0,
    eth: 0,
    etc: 0,
  },
};

const user = (state = initState, action) => {
  switch (action.type) {
    case 'USER.USER_DATA_COMPLETE': {
      const assets = action.payload;
      return { ...state, assets };
    }
    default:
      return state;
  }
};

export default user;
