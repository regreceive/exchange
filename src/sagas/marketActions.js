import { put, takeEvery } from 'redux-saga/effects';
import * as marketActions from '../actions/marketActions';

import { store } from '../store';

function* getData(action) {
  const state = store.getState();

  yield put(marketActions.getMoreDataSuccess({}));
}

export function* watchMarket() {
  yield takeEvery('MARKET.GET_MARKET_DATA', getData);
}
