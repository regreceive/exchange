import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';

import TradesView from './TradesView';
import { subscribeTrades } from '../../../actions/exchangeActions';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    trades: store.exchange.trades,
    symbol: store.exchange.configs.symbol,
  };
})
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.symbol = '';
  }

  componentWillReceiveProps(nextProps) {
    if (this.symbol !== nextProps.symbol) {
      this.symbol = nextProps.symbol;
      this.props.dispatch(subscribeTrades(this.props.symbol));
    }
  }

  render() {
    return (
      <TradesView
        translate={this.props.translate}
        trades={this.props.trades}
        symbol={this.props.symbol}
      />
    );
  }
}
