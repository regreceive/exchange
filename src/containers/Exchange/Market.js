import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';

import {
  changeSearchWord,
  changeCoin,
  getMarketData,
} from '../../actions/marketActions';
import MarketView from '../../components/Exchange/Market/MarketView';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    tokens: store.tokens,
  };
})
export default class Layout extends React.Component {
  componentDidMount() {
    this.props.dispatch(getMarketData('USDT'));
  }

  searchHandle = evt => {
    this.props.dispatch(changeSearchWord(evt.target.value));
  };

  // 切换交易对
  changeCoin = value => () => {
    this.props.dispatch(changeCoin(value));
  };

  render() {
    return (
      <MarketView
        translate={this.props.translate}
        searchHandle={this.searchHandle}
        changeCoin={this.changeCoin}
        tokens={this.props.tokens}
      />
    );
  }
}
