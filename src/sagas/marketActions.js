import { eventChannel } from 'redux-saga';
import { put, call, take, takeEvery } from 'redux-saga/effects';
import { createWebSocketConnection } from '../services/connection';
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

function createSocketChannel(socket) {
  // `eventChannel` 接收一个 subscriber 函数
  // 这个 subscriber 接收一个 `emit` 参数，用来把消息放到 channel 上
  return eventChannel(emit => {
    socket.on('connect', () => {
      console.log(socket.id);
      socket.emit('hello', 'world');
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
    });
    socket.on('MARKET_DATA', data => {
      return emit({ type: 'EXCHANGE.GET_MARKET_DATA_COMPLETE', payload: data });
    });

    return () => {
      socket.off('abc');
    };
  });
}

function* getMarketData(socket, action) {
  const coin = action.payload || 'USDT';
  try {
    yield call([socket, 'emit'], 'GET_MARKET_DATA', coin);
  } catch (e) {
    console.log(e);
  }
}

export function* watchMarket() {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  yield takeEvery(socketChannel, action => put(action));
  yield takeEvery('EXCHANGE.GET_MARKET_DATA', getMarketData, socket);
}
