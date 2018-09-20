import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import registerServiceWorker from './registerServiceWorker';
import { store, persistor } from './store';
import Layout from './components/Layout';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Layout />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
