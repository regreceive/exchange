import { fork, all } from 'redux-saga/effects';

import { watchMarket } from './exchangeActions';
import { watchUser } from './userActions';

export default function* root() {
  yield all([fork(watchMarket), fork(watchUser)]);
}
