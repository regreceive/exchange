const initState = (function() {
  return {
    assets: {
      usdt: 0,
      btc: 0,
      eth: 0,
      etc: 0,
    },
  };
})();

const exchange = (state = initState, action) => {
  switch (action.type) {
    case 'USER.INFO_COMPLETE': {
      const info = action.payload;
      return { ...state, ...info };
    }
    default:
      return state;
  }
};

export default exchange;
