import React from 'react';
import { Row, Col, Input, Icon } from 'antd';
import cs from 'classnames';

import List from './List';

import './MarketView.css';

const MarketView = ({ translate, trans, searchHandle, changeTrans }) => {
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
        <Row type="flex" styleName="trans-wrap">
          <Col span={5} onClick={changeTrans('USDT')}>
            <span styleName={cs('trans', { selected: trans === 'USDT' })}>
              USDT
            </span>
          </Col>
          <Col span={5} onClick={changeTrans('BTC')}>
            <span styleName={cs('trans', { selected: trans === 'BTC' })}>
              BTC
            </span>
          </Col>
          <Col span={5} onClick={changeTrans('ETH')}>
            <span styleName={cs('trans', { selected: trans === 'ETH' })}>
              ETH
            </span>
          </Col>
          <Col span={9} styleName="text-right">
            <span styleName="trans">
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

export default MarketView;
