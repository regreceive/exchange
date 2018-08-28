import React from 'react';
import { Row, Col, Input, Icon } from 'antd';
import cs from 'classnames';

import List from './List';

import './MarketsView.css';

const MarketsView = ({
  translate,
  marketsSymbol,
  searchHandle,
  changeMarketsSymbol,
}) => {
  return (
    <div styleName="container">
      <div styleName="header">
        <Row type="flex" align="middle" styleName="row">
          <Col span={8} styleName="label">
            {translate('exchange.markets')}
          </Col>
          <Col span={10}>
            <Input.Search onChange={searchHandle} size="small" />
          </Col>
          <Col span={6} styleName="cny">
            <Icon type="swap" styleName="icon" />
            CNY
          </Col>
        </Row>
        <Row type="flex" styleName="symbol-wrap">
          <Col span={5} onClick={changeMarketsSymbol('usdt')}>
            <span
              styleName={cs('symbol', { selected: marketsSymbol === 'usdt' })}
            >
              USDT
            </span>
          </Col>
          <Col span={5} onClick={changeMarketsSymbol('btc')}>
            <span
              styleName={cs('symbol', { selected: marketsSymbol === 'btc' })}
            >
              BTC
            </span>
          </Col>
          <Col span={5} onClick={changeMarketsSymbol('eth')}>
            <span
              styleName={cs('symbol', { selected: marketsSymbol === 'eth' })}
            >
              ETH
            </span>
          </Col>
          <Col span={9} styleName="text-right">
            <span styleName="symbol">
              <Icon type="star" styleName="star" />
              <span styleName="mark">{translate('exchange.marked')}</span>
            </span>
          </Col>
        </Row>
      </div>
      <List styleName="table-wrap" />
    </div>
  );
};

export default MarketsView;
