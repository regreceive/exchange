const initState = (function() {
  const markets = [['ENB', 0, 0], ['ECHO', 0, 0]];

  const orders = {
    sell: [],
    buy: [],
  };

  // price, change, high, low, vol
  const latest = [0, 0, 0, 0, 0];
  // timestamp, direction, price, amount
  const deals = [[0, 0, 0, 0]];

  const trade = { money: 0, stock: 0 };

  const depth = {
    bids: [[0, 0]], // 买1价,买1量
    asks: [[0, 0]], // 卖1价,卖1量
  };

  const kline = {};

  return {
    markets,
    orders,
    latest,
    deals,
    trade,
    depth,
    kline,
    configs: {
      symbol: '',
      marketsSymbol: 'usdt',
      period: '1day',
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
    case 'EXCHANGE.DEALS_COMPLETE': {
      const deals = action.payload;
      return { ...state, deals };
    }
    case 'EXCHANGE.DEPTH_COMPLETE': {
      const depth = action.payload;
      return { ...state, depth };
    }
    case 'EXCHANGE.LINE_COMPLETE': {
      const kline = action.payload;
      return { ...state, kline };
    }
    default:
      return state;
  }
};

export default exchange;
