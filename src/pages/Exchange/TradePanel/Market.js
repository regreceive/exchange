import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Row, Slider } from 'antd';

import './TradePanel.css';

const defaultMarks = { 0: '', 0.25: '', 0.5: '', 0.75: '', 1: '' };

function getMarks(max, coin) {
  const step = max / 4;
  return max > 0
    ? {
        0: '0 ' + coin,
        [step]: '',
        [step * 2]: '',
        [step * 3]: '',
        [step * 4]: max + ' ' + coin,
      }
    : defaultMarks;
}

@connect(store => {
  const { money, stock } = store.exchange.trade;
  return {
    money,
    stock,
  };
})
export default class extends React.Component {
  state = {
    moneyValue: 0,
    moneyMarks: defaultMarks,
    stockValue: 0,
    stockMarks: defaultMarks,
  };

  componentWillReceiveProps(nextProps) {
    const { money, stock } = nextProps;
    this.setState({
      moneyMarks: getMarks(money, 'ETC'),
      stockMarks: getMarks(stock, 'ETC'),
    });
  }

  moneyChangeHandle = value => {
    if (this.props.money > 0) {
      this.setState({
        moneyValue: value,
      });
    }
  };

  stockChangeHandle = value => {
    if (this.props.stock > 0) {
      this.setState({
        stockValue: value,
      });
    }
  };

  render() {
    const { money, stock } = this.props;
    const { moneyValue, moneyMarks, stockValue, stockMarks } = this.state;

    return (
      <Row type="flex" justify="space-around" styleName="limit">
        <Col span="11">
          <dl styleName="price">
            <dt>买入价</dt>
            <dd>
              <label>
                <Input
                  size="large"
                  disabled
                  placeholder="以市场上最优价格买入"
                />
                <span styleName="unit">usdt</span>
              </label>
            </dd>
          </dl>

          <dl>
            <dt>交易额</dt>
            <dd>
              <label>
                <Input
                  size="large"
                  type="number"
                  onChange={this.stockChangeHandle}
                  value={stockValue}
                />
                <span styleName="unit">usdt</span>
              </label>
            </dd>
            <dd>
              <Slider
                marks={moneyMarks}
                min={0}
                max={money || 1}
                step={money ? money / 20 : null}
                value={moneyValue}
                defaultValue={0}
                tipFormatter={null}
                onChange={this.moneyChangeHandle}
              />
              <p styleName="range">
                <em>0 usdt</em>
                <em>0.0000 usdt</em>
              </p>
              <p styleName="amount">交易额 19752869136.000000 usdt</p>
            </dd>
          </dl>
          <Button block styleName="button">
            买入 eth
          </Button>
        </Col>

        <Col span="11">
          <dl styleName="price">
            <dt>卖出价</dt>
            <dd>
              <label>
                <Input
                  size="large"
                  disabled
                  placeholder="以市场上最优价格卖出"
                />
                <span styleName="unit">usdt</span>
              </label>
            </dd>
          </dl>

          <dl>
            <dt>卖出量</dt>
            <dd>
              <label>
                <Input
                  size="large"
                  type="number"
                  onChange={this.stockChangeHandle}
                  value={stockValue}
                />
                <span styleName="unit">ltc</span>
              </label>
            </dd>
            <dd>
              <Slider
                marks={stockMarks}
                min={0}
                max={stock || 1}
                step={stock ? stock / 20 : null}
                value={stockValue}
                defaultValue={0}
                tipFormatter={null}
                onChange={this.stockChangeHandle}
              />
              <p styleName="range">
                <em>0 etc</em>
                <em>0.0000 etc</em>
              </p>
              <p styleName="amount">交易额 19752869136.000000 etc</p>
            </dd>
          </dl>

          <Button block styleName="button" type="success">
            卖出 eth
          </Button>
        </Col>
      </Row>
    );
  }
}
