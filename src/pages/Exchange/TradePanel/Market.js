import React from 'react';
import { Button, Col, Input, Row, Slider } from 'antd';

import { defaultMarks, getMarks } from './Limit';
import './TradePanel.css';

export default class extends React.Component {
  state = {
    moneyValue: 0,
    moneyInputValue: 0,
    moneyMarks: defaultMarks,
    stockValue: 0,
    stockInputValue: 0,
    stockMarks: defaultMarks,
  };

  componentWillReceiveProps(nextProps) {
    const { money, stock } = nextProps;
    this.setState({
      moneyMarks: getMarks(money),
      stockMarks: getMarks(stock),
    });
  }

  moneyInputChangeHandle = evt => {
    const value = parseFloat(evt.target.value);
    if (!value) {
      this.setState({
        moneyValue: 0,
        moneyInputValue: '',
      });
    } else if (value !== this.props.moneyValue) {
      this.setState({
        moneyValue: value,
        moneyInputValue: value,
      });
    }
  };

  moneyChangeHandle = value => {
    if (this.props.money > 0) {
      this.setState({
        moneyValue: value,
        moneyInputValue: value.toFixed(2),
      });
    }
  };

  stockInputChangeHandle = evt => {
    const value = parseFloat(evt.target.value);
    if (!value) {
      this.setState({
        stockValue: 0,
        stockInputValue: '',
      });
    } else if (value !== this.props.stockValue) {
      this.setState({
        stockValue: value,
        stockInputValue: value,
      });
    }
  };

  stockChangeHandle = value => {
    if (this.props.stock > 0) {
      this.setState({
        stockValue: value,
        stockInputValue: value.toFixed(2),
      });
    }
  };

  render() {
    const { money, stock, left, right } = this.props;
    const {
      moneyValue,
      moneyInputValue,
      moneyMarks,
      stockValue,
      stockInputValue,
      stockMarks,
    } = this.state;

    return (
      <Row type="flex" justify="space-around" styleName="market">
        <Col span="11">
          <p styleName="available">
            <span>
              可用 {money} {right}
            </span>
            <a href="#">充币</a>
          </p>

          <dl styleName="price">
            <dt>买入价</dt>
            <dd>
              <label>
                <Input
                  size="large"
                  disabled
                  placeholder="以市场上最优价格买入"
                />
                <span styleName="unit">{right}</span>
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
                  onChange={this.moneyInputChangeHandle}
                  value={moneyInputValue}
                />
                <span styleName="unit">{right}</span>
              </label>
            </dd>
            <dd styleName="holder">
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
                <em>0 {right}</em>
                <em>
                  {money} {right}
                </em>
              </p>
            </dd>
          </dl>
          <Button block styleName="button">
            买入 {left}
          </Button>
        </Col>

        <Col span="11">
          <p styleName="available">
            <span>
              可用 {stock} {left}
            </span>
            <a href="#">充币</a>
          </p>

          <dl styleName="price">
            <dt>卖出价</dt>
            <dd>
              <label>
                <Input
                  size="large"
                  disabled
                  placeholder="以市场上最优价格卖出"
                />
                <span styleName="unit">{right}</span>
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
                  onChange={this.stockInputChangeHandle}
                  value={stockInputValue}
                />
                <span styleName="unit">{left}</span>
              </label>
            </dd>
            <dd styleName="holder">
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
                <em>0 {left}</em>
                <em>
                  {stock} {left}
                </em>
              </p>
            </dd>
          </dl>

          <Button block styleName="button" type="success">
            卖出 {left}
          </Button>
        </Col>
      </Row>
    );
  }
}
