import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';
import { localizeReducer as locale } from 'react-localize-redux';

import market from './marketReducer';

const appReducer = combineReducers({
  locale,
  market: persistReducer(
    {
      key: 'market',
      storage: session,
    },
    market,
  ),
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
