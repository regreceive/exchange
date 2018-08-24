export function setCoin(coin) {
  return {
    type: 'EXCHANGE.SET_COIN',
    payload: coin,
  };
}

export function changeSearchWord(value) {
  return {
    type: 'EXCHANGE.CHANGE_SEARCH_WORD',
    payload: value,
  };
}

export function subscribeMarketData(trans) {
  return {
    type: 'EXCHANGE.SUBSCRIBE_MARKET_DATA',
    payload: trans,
  };
}

export function switchMarketData(trans) {
  return {
    type: 'EXCHANGE.SWITCH_MARKET_DATA',
    payload: trans,
  };
}

export function marketDataComplete(data) {
  return {
    type: 'EXCHANGE.MARKET_DATA_COMPLETE',
    payload: data,
  };
}

export function subscribeLatest(coin) {
  return {
    type: 'EXCHANGE.SUBSCRIBE_LATEST',
    payload: coin,
  };
}

export function latestComplete(data) {
  return {
    type: 'EXCHANGE.LATEST_COMPLETE',
    payload: data,
  };
}

// 对手盘
export function subscribeOrders(coin) {
  return {
    type: 'EXCHANGE.SUBSCRIBE_ORDERS',
    payload: coin,
  };
}

export function ordersComplete(data) {
  return {
    type: 'EXCHANGE.ORDERS_COMPLETE',
    payload: data,
  };
}
