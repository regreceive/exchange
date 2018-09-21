export function setSymbol(symbol) {
  return {
    type: 'EXCHANGE.SET_SYMBOL',
    payload: symbol,
  };
}

export function changeSearchWord(value) {
  return {
    type: 'EXCHANGE.CHANGE_SEARCH_WORD',
    payload: value,
  };
}

export function subscribeMarkets(symbol) {
  return {
    type: 'EXCHANGE.SUBSCRIBE_MARKETS',
    payload: symbol,
  };
}

export function switchMarkets(symbol) {
  return {
    type: 'EXCHANGE.SWITCH_MARKETS',
    payload: symbol,
  };
}

export function marketsComplete(data) {
  return {
    type: 'EXCHANGE.MARKETS_COMPLETE',
    payload: data,
  };
}

export function subscribeLatest(symbol) {
  return {
    type: 'EXCHANGE.SUBSCRIBE_LATEST',
    payload: symbol,
  };
}

export function latestComplete(data) {
  return {
    type: 'EXCHANGE.LATEST_COMPLETE',
    payload: data,
  };
}

// 对手盘
export function subscribeOrders(symbol) {
  return {
    type: 'EXCHANGE.SUBSCRIBE_ORDERS',
    payload: symbol,
  };
}

export function ordersComplete(data) {
  return {
    type: 'EXCHANGE.ORDERS_COMPLETE',
    payload: data,
  };
}

export function subscribeDeals(symbol) {
  return {
    type: 'EXCHANGE.SUBSCRIBE_DEALS',
    payload: symbol,
  };
}

export function dealsComplete(data) {
  return {
    type: 'EXCHANGE.DEALS_COMPLETE',
    payload: data,
  };
}

export function subscribeDepth(symbol) {
  return {
    type: 'EXCHANGE.SUBSCRIBE_DEPTH',
    payload: symbol,
  };
}

export function depthComplete(data) {
  return {
    type: 'EXCHANGE.DEPTH_COMPLETE',
    payload: data,
  };
}

export function subscribeKLine(symbol) {
  return {
    type: 'EXCHANGE.SUBSCRIBE_KLINE',
    payload: symbol,
  };
}

export function klineComplete(data) {
  return {
    type: 'EXCHANGE.KLINE_COMPLETE',
    payload: data,
  };
}
