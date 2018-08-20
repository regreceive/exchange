import { fork, all } from 'redux-saga/effects';

import { watchMarket } from './marketActions';

export default function* root() {
  yield all([fork(watchMarket)]);
}
