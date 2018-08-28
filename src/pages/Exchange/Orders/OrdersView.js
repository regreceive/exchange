import React from 'react';
import { Row, Col } from 'antd';
import uuid from 'uuid/v1';

import './OrdersView.css';

const SellOrders = ({ lists }) => {
  const length = lists.length;
  return lists.reverse().map((list, index) => {
    return (
      <dd key={uuid()}>
        <Row styleName="text-right color-sell">
          <Col span={3}>卖 {length - index}</Col>
          <Col span={7}>{list[0].toFixed(2)}</Col>
          <Col span={7}>{list[1].toFixed(4)}</Col>
          <Col span={7}>{list[2].toFixed(4)}</Col>
        </Row>
      </dd>
    );
  });
};

const BuyOrders = ({ lists }) => {
  return lists.map((list, index) => {
    return (
      <dd key={uuid()}>
        <Row styleName="text-right color-buy">
          <Col span={3}>买 {index + 1}</Col>
          <Col span={7}>{list[0].toFixed(2)}</Col>
          <Col span={7}>{list[1].toFixed(4)}</Col>
          <Col span={7}>{list[2].toFixed(4)}</Col>
        </Row>
      </dd>
    );
  });
};

const OrdersView = ({ translate, orders, latest, symbol }) => {
  return (
    <div styleName="container">
      <div styleName="header">
        {translate('exchange.last_price')} {latest[0]} USDT
        <span>≈ {latest[0]} CNY</span>
      </div>
      <dl>
        <dt>
          <Row styleName="text-right">
            <Col span={3} />
            <Col span={7}>价格(USDT)</Col>
            <Col span={7}>
              数量(
              {symbol})
            </Col>
            <Col span={7}>
              累计(
              {symbol})
            </Col>
          </Row>
        </dt>
        <SellOrders lists={orders.sell} />
      </dl>
      <hr styleName="divider" />
      <dl>
        <BuyOrders lists={orders.buy} />
      </dl>
    </div>
  );
};
export default OrdersView;
