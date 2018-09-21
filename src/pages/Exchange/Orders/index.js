import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';

import OrdersView from './OrdersView';
import { subscribeOrders } from '../../../actions/exchangeActions';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    orders: store.exchange.orders,
    latest: store.exchange.latest,
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
      this.props.dispatch(subscribeOrders(this.symbol));
    }
  }

  render() {
    const [symbol] = this.props.symbol.split('_');
    return (
      <OrdersView
        translate={this.props.translate}
        orders={this.props.orders}
        latest={this.props.latest}
        symbol={symbol}
      />
    );
  }
}
