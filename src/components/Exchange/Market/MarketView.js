import React from 'react';
import { Input, Icon } from 'antd';

import List from '../../../containers/Exchange/List';

import './MarketView.css';

const MarketView = ({ translate, searchHandle, changeCoin }) => {
  return (
    <div styleName="container">
      <strong>{translate('exchange.markets')}</strong>
      <div styleName="search_wrap">
        <Input.Search onChange={searchHandle} size="small" />
      </div>
      <div styleName="switch_wrap">
        <Icon type="swap" />
        <b>cny</b>
      </div>
      <div styleName="coin">
        <span onClick={changeCoin('USDT')}>USDT</span>
        <span onClick={changeCoin('BTC')}>BTC</span>
        <span onClick={changeCoin('ETH')}>ETH</span>
        <span>
          <Icon type="star-o" />
          {translate('exchange.marked')}
        </span>
      </div>
      <List />
    </div>
  );
};

export default MarketView;
