export function getUserdata() {
  return {
    type: 'USER.GET_USER_DATA',
    payload: '/user-data',
  };
}

export function userDataComplete(data) {
  return {
    type: 'USER.USER_DATA_COMPLETE',
    payload: data.assets,
  };
}
