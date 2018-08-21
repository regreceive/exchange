import * as converters from '../utils/converter';

const initState = (function() {
  const coin = {};
  ['BTC', 'BCH', 'ETH', 'LTC'].forEach(key => {
    coin[key] = {
      price: 0,
      change: 0,
    };
  });
  const markets = { trans: 'USDT', coin };

  return {
    markets,
    configs: {
      itemCoin: 'USDT',
      isShowTradingChart: false,
      isLoading: false,
      searchWord: '',
    },
  };
})();

const exchange = (state = initState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'EXCHANGE.CHANGE_SEARCH_WORD': {
      const searchWord = action.payload;
      const configs = newState.configs;
      configs.searchWord = searchWord;
      return { ...newState, configs: { ...configs }, sortedTokens: [] };
    }
    case 'EXCHANGE.CHANGE_COIN': {
      const value = action.payload;
      const configs = newState.configs;
      configs.itemCoin = value;
      return { ...newState, configs: { ...configs } };
    }
    case 'EXCHANGE.GET_MARKET_DATA_COMPLETE': {
      const value = action.payload;
      const configs = state.configs;
      return { ...state, markets: value, configs: { ...configs } };
    }

    case 'MARKET.CHANGE_CURRENCY': {
      const value = action.payload;
      const configs = newState.configs;
      configs.currency.focus = value;
      return { ...newState, configs: { ...configs } };
    }
    case 'MARKET.CHANGE_SORT': {
      const value = action.payload;
      const configs = newState.configs;
      configs.sort.focus = value;
      return { ...newState, configs: { ...configs } };
    }
    case 'MARKET.CHANGE_DISPLAY_COLUMN': {
      const value = action.payload;
      const configs = newState.configs;
      configs.column.display.active = value;
      return { ...newState, configs: { ...configs } };
    }
    case 'MARKET.CHANGE_SHOW_COLUMN': {
      const { column, show } = action.payload;
      const configs = newState.configs;
      const active = configs.column.shows.active;
      if (show) {
        active.push(column);
      } else {
        const index = active.indexOf(column);
        if (index !== -1) active.splice(index, 1);
      }
      const listItem = configs.column.shows.listItem;
      configs.column.shows = { listItem, active };
      return { ...newState, configs: { ...configs } };
    }

    case 'MARKET.SHOW_TRADINGVIEW_CHART': {
      const { symbol } = action.payload;
      newState.configs.isShowTradingChart = true;
      newState.configs.selectedSymbol = symbol;
      return newState;
    }
    case 'MARKET.HIDE_TRADINGVIEW_CHART': {
      newState.configs.isShowTradingChart = false;
      return newState;
    }

    case 'MARKET.GET_GENERAL_INFO_TOKENS_COMPLETE': {
      break;
    }

    case 'MARKET.GET_MORE_DATA': {
      const configs = newState.configs;
      configs.isLoading = true;
      return { ...newState, configs: { ...configs } };
    }

    case 'MARKET.UPDATE_PAGE_NUM_SUCCESS': {
      const page = action.payload;
      const configs = newState.configs;
      configs.page = page.nextPage;
      configs.isLoading = false;
      return { ...newState, configs: { ...configs } };
    }

    case 'MARKET.RESET_LIST_TOKEN': {
      const configs = newState.configs;
      configs.isLoading = false;
      configs.page = 1;
      return { ...newState, configs: { ...configs } };
    }

    case 'MARKET.UPDATE_SORT_STATE': {
      const { sortKey, sortType } = action.payload;
      const newSortType = {};
      newSortType[sortKey] = sortType;
      const configs = newState.configs;
      configs.sortKey = sortKey;
      configs.sortType = newSortType;
      return { ...newState, configs: { ...configs } };
    }

    case 'MARKET.UPDATE_SORTED_TOKENS': {
      const newSortedTokens = action.payload.sortedTokens;
      const configs = newState.configs;
      let sortedTokens = newState.sortedTokens;
      configs.isLoading = false;
      configs.page = 1;
      sortedTokens = newSortedTokens;
      return {
        ...newState,
        configs: { ...configs },
        sortedTokens: sortedTokens,
      };
    }

    case 'MARKET.GET_MORE_DATA_SUCCESS': {
      const last7D = action.payload.data;
      const tokens = { ...newState.tokens };
      Object.keys(last7D).forEach(key => {
        if (!tokens[key]) return;
        const last_7d = last7D[key];
        if (last_7d && last_7d.length > 0) {
          tokens[key].ETH.last_7d = last_7d;
          tokens[key].USD.last_7d = last_7d;
        }
      });
      return { ...newState, tokens: { ...tokens } };
    }

    case 'MARKET.GET_MARKET_INFO_SUCCESS': {
      const { data, rateUSD } = action.payload;
      const tokens = { ...newState.tokens };
      const newTokens = newState.tokens;
      Object.keys(data).forEach(key => {
        if (!tokens[key]) return;

        const token = data[key];
        let change = -9999;

        if (token.rate) {
          //get 24h change
          const buyPrice = parseFloat(tokens[key].ETH.buyPrice);
          const sellPrice = parseFloat(tokens[key].ETH.sellPrice);

          if (sellPrice <= 0 || buyPrice <= 0) {
            change = -9999;
          } else {
            const midlePrice = (buyPrice + sellPrice) / 2;
            const price24h = token.rate;
            if (midlePrice > price24h) {
              change = converters.calculatePercent(midlePrice, price24h);
            } else {
              change = converters.calculatePercent(price24h, midlePrice) * -1;
            }
          }
        }

        tokens[key].USD.change = tokens[key].ETH.change = change;
        if (newTokens[key] && token.quotes) {
          newTokens[key].ETH.market_cap = token.quotes.ETH.market_cap;
          newTokens[key].ETH.volume = token.quotes.ETH.volume_24h
            ? Math.round(token.quotes.ETH.volume_24h)
            : 0;

          newTokens[key].USD.market_cap = Math.round(
            token.quotes.ETH.market_cap * rateUSD,
          );
          newTokens[key].USD.volume = token.quotes.USD.volume_24h
            ? Math.round(token.quotes.USD.volume_24h)
            : 0;
        }
      });
      return { ...newState, tokens: { ...tokens } };
    }

    case 'MARKET.GET_LAST_7D_SUCCESS': {
      const last7D = action.payload;
      const tokens = { ...newState.tokens };
      Object.keys(last7D).forEach(key => {
        if (!tokens[key]) return;
        const last_7d = last7D[key];
        if (last_7d && last_7d.length > 0) {
          tokens[key].ETH.last_7d = last_7d;
          tokens[key].USD.last_7d = last_7d;
        }
      });
      return { ...newState, tokens: { ...tokens } };
    }

    case 'GLOBAL.ALL_RATE_UPDATED_FULFILLED': {
      const { rates, rateUSD } = action.payload;
      if (!rates) {
        return { ...state };
      }
      const tokens = newState.tokens;
      rates.forEach(rate => {
        if (rate.source !== 'ETH') {
          if (tokens[rate.source]) {
            const sellPriceETH = converters.convertSellRate(rate.rate);
            tokens[rate.source].ETH.sellPrice = parseFloat(
              converters.roundingNumber(sellPriceETH),
            );
            tokens[rate.source].USD.sellPrice = parseFloat(
              converters.roundingNumber(sellPriceETH * rateUSD),
            );
          }
        } else {
          if (tokens[rate.dest]) {
            var buyPriceETH = converters.convertBuyRate(rate.rate);
            tokens[rate.dest].ETH.buyPrice = parseFloat(
              converters.roundingNumber(buyPriceETH),
            );
            tokens[rate.dest].USD.buyPrice = parseFloat(
              converters.roundingNumber(buyPriceETH * rateUSD),
            );
          }
        }
      });
      return { ...newState, tokens: { ...tokens } };
    }

    default:
      return state;
  }
};

export default exchange;
