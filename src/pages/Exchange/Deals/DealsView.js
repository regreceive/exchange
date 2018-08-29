import React from 'react';
import { Row, Col, Icon } from 'antd';
import dayjs from 'dayjs';
import uuid from 'uuid/v1';
import cs from 'classnames';

import './DealsView.css';

function toTime(timestamp) {
  return dayjs(timestamp).format('HH:mm:ss');
}

const types = ['买', '卖'];
function toType(bit) {
  return types[bit];
}

const Deals = ({ lists }) => {
  return lists.map(list => {
    return (
      <dd key={uuid()}>
        <Row styleName="text-right">
          <Col span={7}>{toTime(list[0])}</Col>
          <Col
            span={3}
            styleName={cs({
              'color-buy': list[1] === 0,
              'color-sell': list[1] === 1,
            })}
          >
            {toType(list[1])}
          </Col>
          <Col span={6}>{list[2].toFixed(2)}</Col>
          <Col span={8}>{list[3].toFixed(4)}</Col>
        </Row>
      </dd>
    );
  });
};

const DealsView = ({ translate, deals, coin }) => {
  return (
    <div styleName="container">
      <div styleName="header">
        <Icon type="down" />
        <span>实时成交</span>
      </div>
      <dl>
        <dt>
          <Row styleName="text-right">
            <Col span={7}>时间</Col>
            <Col span={3}>方向</Col>
            <Col span={6}>价格(USDT)</Col>
            <Col span={8}>
              数量(
              {coin})
            </Col>
          </Row>
        </dt>
        <Deals lists={deals} />
      </dl>
    </div>
  );
};
export default DealsView;
