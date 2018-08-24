import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';

import OrderView from './OrderView';
import { subscribeOrders } from '../../../actions/exchangeActions';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    orders: store.exchange.orders,
    latest: store.exchange.latest,
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
      this.props.dispatch(subscribeOrders(this.props.coin));
    }
  }

  render() {
    return (
      <OrderView
        translate={this.props.translate}
        orders={this.props.orders}
        latest={this.props.latest}
        coin={this.props.coin}
      />
    );
  }
}
