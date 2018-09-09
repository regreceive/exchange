import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import constants from '../../services/constants';

import './LayoutView.css';

const LayoutView = props => {
  let defaultPathExchange = constants.BASE_HOST + '/exchange/eth_usdt';
  if (props.currentLanguage !== 'en') {
    defaultPathExchange += '?lang=' + props.currentLanguage;
  }

  return (
    <ConnectedRouter history={props.history}>
      <section>
        <Switch>
          <Route
            exact
            path={constants.BASE_HOST + '/exchange/:symbol'}
            component={props.exchange}
          />
          <Redirect to={defaultPathExchange} />
        </Switch>
      </section>
    </ConnectedRouter>
  );
};

export default LayoutView;
