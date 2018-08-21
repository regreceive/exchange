import { fork, all } from 'redux-saga/effects';

import { watchMarket } from './exchangeActions';

export default function* root() {
  yield all([fork(watchMarket)]);
}
