import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';

import {
  changeSearchWord,
  subscribeMarkets,
  switchMarkets,
} from '../../../actions/exchangeActions';
import MarketsView from './MarketsView';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    marketsSymbol: store.exchange.configs.marketsSymbol,
  };
})
export default class extends React.Component {
  componentDidMount() {
    this.props.dispatch(subscribeMarkets(this.props.marketsSymbol));
  }

  searchHandle = evt => {
    this.props.dispatch(changeSearchWord(evt.target.value));
  };

  // 切换交易对
  changeMarketsSymbol = value => () => {
    if (value !== this.props.marketsSymbol) {
      console.log(value);
      this.props.dispatch(switchMarkets(value));
    }
  };

  render() {
    return (
      <MarketsView
        translate={this.props.translate}
        marketsSymbol={this.props.marketsSymbol}
        searchHandle={this.searchHandle}
        changeMarketsSymbol={this.changeMarketsSymbol}
      />
    );
  }
}
