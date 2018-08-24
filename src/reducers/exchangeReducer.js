const initState = (function() {
  const markets = {
    trans: 'USDT',
    coins: [['ENB', 0, 0], ['ECHO', 0, 0]],
  };

  const orders = {
    sell: [],
    buy: [],
  };

  // price, change, high, low, vol
  const latest = [0, 0, 0, 0, 0];
  // timestamp, type, price, amount
  const trades = [0, 0, 0, 0];

  return {
    markets,
    orders,
    latest,
    trades,
    configs: {
      coin: '',
      trans: 'USDT',
      searchWord: '',
    },
  };
})();

const exchange = (state = initState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'EXCHANGE.SET_COIN': {
      const coin = action.payload;
      const configs = state.configs;
      return { ...state, configs: { ...configs, coin } };
    }
    case 'EXCHANGE.CHANGE_SEARCH_WORD': {
      const searchWord = action.payload;
      const configs = state.configs;
      return { ...state, configs: { ...configs, searchWord } };
    }
    case 'EXCHANGE.SWITCH_MARKET_DATA': {
      const value = action.payload;
      const configs = newState.configs;
      configs.trans = value;
      return { ...newState, configs: { ...configs } };
    }
    case 'EXCHANGE.MARKET_DATA_COMPLETE': {
      const markets = action.payload;
      return { ...state, markets };
    }
    case 'EXCHANGE.LATEST_COMPLETE': {
      const latest = action.payload;
      return { ...state, latest };
    }
    case 'EXCHANGE.ORDERS_COMPLETE': {
      const orders = action.payload;
      return { ...state, orders };
    }
    case 'EXCHANGE.TRADES_COMPLETE': {
      const trades = action.payload;
      return { ...state, trades };
    }
    default:
      return state;
  }
};

export default exchange;
