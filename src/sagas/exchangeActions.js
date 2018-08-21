import { eventChannel } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';
import { createWebSocketConnection } from '../services/connection';

function createSocketChannel(socket) {
  return eventChannel(emit => {
    socket.on('connect', () => {
      console.log(socket.id);
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
    });
    socket.on('MARKET_DATA', data => {
      return emit({
        type: 'EXCHANGE.MARKET_DATA_COMPLETE',
        payload: data,
      });
    });

    return () => {
      socket.off('abc');
      socket.close();
    };
  });
}

function* subscribeMarketData(socket, action) {
  const coin = action.payload || 'USDT';
  try {
    yield call([socket, 'emit'], 'SUBSCRIBE_MARKET_DATA', coin);
  } catch (e) {
    console.log(e);
  }
}

function* switchMarketData(socket, action) {
  const coin = action.payload || 'USDT';
  try {
    yield call([socket, 'emit'], 'SWITCH_MARKET_DATA', coin);
  } catch (e) {
    console.log(e);
  }
}

function* socketResponseHandle(action) {
  yield put(action);
}

export function* watchMarket() {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  yield takeEvery(socketChannel, socketResponseHandle);
  yield takeEvery(
    'EXCHANGE.SUBSCRIBE_MARKET_DATA',
    subscribeMarketData,
    socket,
  );
  yield takeEvery('EXCHANGE.SWITCH_MARKET_DATA', switchMarketData, socket);
}
