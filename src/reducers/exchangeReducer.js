const initState = (function() {
  const markets = {
    coins: [['ENB', 0, 0], ['ECHO', 0, 0]],
  };

  const orders = {
    sell: [],
    buy: [],
  };

  // price, change, high, low, vol
  const latest = [0, 0, 0, 0, 0];
  // timestamp, type, price, amount
  const trades = [[0, 0, 0, 0]];

  return {
    markets,
    orders,
    latest,
    trades,
    configs: {
      coin: '',
      marketsSymbol: 'usdt',
      searchWord: '',
    },
  };
})();

const exchange = (state = initState, action) => {
  switch (action.type) {
    case 'EXCHANGE.SET_SYMBOL': {
      const symbol = action.payload;
      const configs = state.configs;
      return { ...state, configs: { ...configs, symbol } };
    }
    case 'EXCHANGE.CHANGE_SEARCH_WORD': {
      const searchWord = action.payload;
      const configs = state.configs;
      return { ...state, configs: { ...configs, searchWord } };
    }
    case 'EXCHANGE.SWITCH_MARKETS': {
      const marketsSymbol = action.payload;
      const configs = state.configs;
      return { ...state, configs: { ...configs, marketsSymbol } };
    }
    case 'EXCHANGE.MARKETS_COMPLETE': {
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
