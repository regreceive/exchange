import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';

import DealsView from './DealsView';
import { subscribeDeals } from '../../../actions/exchangeActions';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    deals: store.exchange.deals,
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
      this.props.dispatch(subscribeDeals(this.symbol));
    }
  }

  render() {
    return (
      <DealsView
        translate={this.props.translate}
        deals={this.props.deals}
        symbol={this.props.symbol}
      />
    );
  }
}
