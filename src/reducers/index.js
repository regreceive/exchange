import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import session from 'redux-persist/lib/storage/session';
import { localizeReducer as locale } from 'react-localize-redux';
import chartData from './chartData';
import exchange from './exchangeReducer';

const appReducer = combineReducers({
  locale,
  exchange: persistReducer(
    {
      key: 'exchange',
      storage: session,
    },
    exchange,
  ),
  chartData,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
