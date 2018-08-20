import { put, takeEvery } from 'redux-saga/effects';
import { setConnection } from '../actions/connectionActions';
import { socket } from '../services/connection';

export function* createNewConnection(action) {
  yield put(setConnection(socket));
}

export function* watchConnection() {
  yield takeEvery('CONNECTION.CREATE_NEW_CONNECTION', createNewConnection);
}
