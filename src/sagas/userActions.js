import { put, call, takeEvery } from 'redux-saga/effects';

import * as actions from '../actions/userActions';

const API = process.env.REACT_APP_API;

function* fetchData(action) {
  try {
    const response = yield call(fetch, API + '/user' + action.payload, {
      credentials: 'include',
    });
    const json = yield call([response, 'json']);
    yield put(actions.userDataComplete(json.data));
  } catch (e) {
    console.log(e);
  }
}

export function* watchUser() {
  yield takeEvery('USER.GET_USER_DATA', fetchData);
}
