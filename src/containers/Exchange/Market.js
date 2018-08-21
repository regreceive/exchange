import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';

import {
  changeSearchWord,
  subscribeMarketData,
  switchMarketData,
} from '../../actions/exchangeActions';
import MarketView from '../../components/Exchange/Market/MarketView';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    trans: store.exchange.configs.trans,
  };
})
export default class Layout extends React.Component {
  componentDidMount() {
    this.props.dispatch(subscribeMarketData('USDT'));
  }

  searchHandle = evt => {
    this.props.dispatch(changeSearchWord(evt.target.value));
  };

  // 切换交易对
  changeTrans = value => () => {
    if (value !== this.props.trans) {
      this.props.dispatch(switchMarketData(value));
    }
  };

  render() {
    return (
      <MarketView
        translate={this.props.translate}
        searchHandle={this.searchHandle}
        changeTrans={this.changeTrans}
      />
    );
  }
}
