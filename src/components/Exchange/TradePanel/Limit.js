import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import './TradePanel.css';
function callback(key) {
  console.log(key);
}
const Limit = () => {
  return (
    <Row type="flex" justify="space-between" styleName="limit">
      <Col span="11">
        <div>买入价</div>
        <Input />
        <p styleName="bg" />
        <div>买入量</div>
        <Input />
        <p styleName="bg" />
        <Button>买入ETH</Button>
      </Col>
      <Col span="11">
        <div>卖出价</div>
        <Input />
        <p styleName="bg" />
        <div>卖出量</div>
        <Input />
        <p styleName="bg" />
        <Button>买入ETH</Button>
      </Col>
    </Row>
  );
};
export default Limit;
