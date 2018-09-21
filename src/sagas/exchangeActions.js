import { eventChannel } from 'redux-saga';
import { put, call, select, takeEvery } from 'redux-saga/effects';

import * as conn from '../services/connection';
import * as actions from '../actions/exchangeActions';

function createSocketChannel() {
  return eventChannel(emit => {
    conn
      .on('markets', (symbol, extraArgs, data) => {
        return emit(actions.marketsComplete(data.tick.markets));
      })
      .on('latest', (symbol, extraArgs, data) => {
        return emit(actions.latestComplete(data.tick.latest));
      })
      .on('orders', (symbol, extraArgs, data) => {
        return emit(actions.ordersComplete(data.tick));
      })
      .on('deals', (symbol, extraArgs, data) => {
        return emit(actions.dealsComplete(data.tick.deals));
      })
      .on('depth', (symbol, extraArgs, data) => {
        return emit(actions.depthComplete(data.tick));
      })
      .on('line', (symbol, extraArgs, data) => {
        return emit(actions.klineComplete(data.tick));
      });

    return () => {
      conn.close();
    };
  });
}

function* subscribeMarkets(action) {
  const symbol = action.payload;
  try {
    yield call([conn, 'subscribe'], { sub: `market.${symbol}.markets` });
  } catch (e) {
    console.log(e);
  }
}

function* switchMarkets(action) {
  const symbol = action.payload;
  try {
    yield call([conn, 'switches'], { sub: `market.${symbol}.markets` });
  } catch (e) {
    console.log(e);
  }
}

function* subscribeLatest(action) {
  const symbol = action.payload.replace('_', '');
  try {
    yield call([conn, 'subscribe'], { sub: `market.${symbol}.latest` });
  } catch (e) {
    console.log(e);
  }
}

function* subscribeOrders(action) {
  const symbol = action.payload.replace('_', '');
  try {
    yield call([conn, 'subscribe'], { sub: `market.${symbol}.orders` });
  } catch (e) {
    console.log(e);
  }
}

function* subscribeDeals(action) {
  const symbol = action.payload.replace('_', '');
  try {
    yield call([conn, 'subscribe'], { sub: `market.${symbol}.deals` });
  } catch (e) {
    console.log(e);
  }
}

function* subscribeDepth(action) {
  const symbol = action.payload.replace('_', '');
  try {
    yield call([conn, 'subscribe'], { sub: `market.${symbol}.depth` });
  } catch (e) {
    console.log(e);
  }
}

function* subscribeKLine(action) {
  const symbol = action.payload.replace('_', '');
  const {
    exchange: {
      configs: { period },
    },
  } = yield select();

  try {
    yield call([conn, 'subscribe'], {
      sub: `market.${symbol}.kline.${period}`,
    });
  } catch (e) {
    console.log(e);
  }
}

function* socketResponseHandle(action) {
  yield put(action);
}

export function* watchMarket() {
  yield call(conn.createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel);

  yield takeEvery(socketChannel, socketResponseHandle);
  yield takeEvery('EXCHANGE.SUBSCRIBE_MARKETS', subscribeMarkets);
  yield takeEvery('EXCHANGE.SWITCH_MARKETS', switchMarkets);
  yield takeEvery('EXCHANGE.SUBSCRIBE_LATEST', subscribeLatest);
  yield takeEvery('EXCHANGE.SUBSCRIBE_ORDERS', subscribeOrders);
  yield takeEvery('EXCHANGE.SUBSCRIBE_DEALS', subscribeDeals);
  yield takeEvery('EXCHANGE.SUBSCRIBE_DEPTH', subscribeDepth);
  yield takeEvery('EXCHANGE.SUBSCRIBE_KLINE', subscribeKLine);
}
