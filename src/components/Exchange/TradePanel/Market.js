import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import './TradePanel.css';
function callback(key) {}
const Market = () => {
  return (
    <Row type="flex" justify="space-between" styleName="limit market">
      <Col span="11">
        <div>买入价</div>
        <Input />
        {/* <p styleName="bg" /> */}
        <div>交易额</div>
        <Input />
        {/* <p styleName="bg" /> */}
        <p styleName="info">
          交易额 <span>19752869136.000000 BTC</span>
        </p>
        <Button style={{ width: '100%' }}>买入ETH</Button>
      </Col>
      <Col span="11">
        <div>卖出价</div>
        <Input />
        {/* <p styleName="bg" /> */}
        <div>卖出量</div>
        <Input />
        {/* <p styleName="bg" /> */}
        <p styleName="info">
          交易额 <span>19752869136.000000 BTC</span>
        </p>
        <Button style={{ width: '100%' }}>卖出ETH</Button>
      </Col>
    </Row>
  );
};
export default Market;
