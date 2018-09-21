import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';
import { localizeReducer as locale } from 'react-localize-redux';
import exchange from './exchangeReducer';
import user from './userReducer';

const appReducer = combineReducers({
  locale,
  exchange,
  user: persistReducer(
    {
      key: 'user',
      storage: session,
    },
    user,
  ),
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
