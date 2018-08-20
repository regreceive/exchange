import { fork, all } from 'redux-saga/effects';

import { watchMarket } from './marketActions';
import { watchConnection } from './connectionActions';

export default function* root() {
  yield all([fork(watchMarket), fork(watchConnection)]);
}
