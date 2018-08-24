import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import constants from '../../services/constants';

import './LayoutView.css';

const LayoutView = props => {
  let defaultPathExchange = constants.BASE_HOST + '/exchange/ETH';
  if (props.currentLanguage !== 'en') {
    defaultPathExchange += '?lang=' + props.currentLanguage;
  }
  return (
    <ConnectedRouter history={props.history}>
      <div>
        <section id="content">
          <Switch>
            <Route
              exact
              path={constants.BASE_HOST + '/exchange/:coin'}
              component={props.exchange}
            />
            <Redirect to={defaultPathExchange} />
          </Switch>
        </section>
      </div>
    </ConnectedRouter>
  );
};

export default LayoutView;
