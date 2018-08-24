import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';

import MarketTradesView from './MarketTradesView';
import { subscribeTrades } from '../../../actions/exchangeActions';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    trades: store.exchange.trades,
    coin: store.exchange.configs.coin,
  };
})
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.coin = '';
  }

  componentWillReceiveProps(nextProps) {
    if (this.coin !== nextProps.coin) {
      this.coin = nextProps.coin;
      this.props.dispatch(subscribeTrades(this.props.coin));
    }
  }

  render() {
    return (
      <MarketTradesView
        translate={this.props.translate}
        trades={this.props.trades}
        coin={this.props.coin}
      />
    );
  }
}
