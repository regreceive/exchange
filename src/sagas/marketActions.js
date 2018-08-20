import { eventChannel } from 'redux-saga';
import { put, call, take, takeEvery } from 'redux-saga/effects';
import * as exchangeActions from '../actions/marketActions';

import { store } from '../store';
import io from 'socket.io-client';

function initWebsocket() {
  return eventChannel(emitter => {
    const socket = io('http://localhost', {
      path: '/exchange',
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log(socket.id);
      socket.emit('hello', 'world');
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
    });
    socket.on('abc', data => {
      return emitter();
    });
    // unsubscribe function
    return () => {
      socket.close();
    };
  });
}

function* getData(action) {
  const state = store.getState();
  //const marketsConn = state.connection.exchange;
  const coin = action.payload || 'USDT';
  try {
    // console.log(data);
    //const data = yield call(marketsConn, 'getMarketData', coin);
    //yield put(exchangeActions.getMarketDataComplete({ data, coin }));
  } catch (e) {
    console.log(e);
  }
}

export function* watchMarket() {
  // const channel = yield call(initWebsocket);
  // const action = yield take(channel);
  // yield takeEvery('EXCHANGE.GET_MARKET_DATA', getData);
}
