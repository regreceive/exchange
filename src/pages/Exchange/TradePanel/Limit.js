import React from 'react';
import { Button, Col, Input, Row, Slider } from 'antd';

import './TradePanel.css';

export const defaultMarks = { 0: '', 0.25: '', 0.5: '', 0.75: '', 1: '' };

// slide组件的分段标记
export function getMarks(max) {
  const step = max / 4;
  return max > 0
    ? {
        0: '',
        [step]: '',
        [step * 2]: '',
        [step * 3]: '',
        [step * 4]: '',
      }
    : defaultMarks;
}

// slide组件滑块的步长
export function getStep(num) {
  let step = null;
  if (!num) {
    step = null;
  } else if (num <= 0.01) {
    step = 0.0001;
  } else {
    step = num / 20;
  }
  return step;
}

function floor(num) {
  return Math.floor(num * 10000) / 10000;
}

export default class extends React.Component {
  state = {
    buyAvailable: 0, // 可购买币数量
    buyStep: null, // 滑块步长
    buyValue: 0, // slide对应的购买量
    buyInputValue: 0, // input对应的购买量
    buyMarks: defaultMarks, // slide线段

    sellAvailable: 0, // 与上面一致，反向状态
    sellStep: null,
    sellValue: 0,
    sellInputValue: 0,
    sellMarks: defaultMarks,
  };

  componentWillReceiveProps(nextProps) {
    const { money, stock, rate } = nextProps;
    // 可交易数据不能小于0.00001
    const buyAvailable = rate > 0 ? floor(money / rate) : 0;
    const sellAvailable = floor(stock);

    // 滑块步长
    const buyStep = getStep(buyAvailable);
    const sellStep = getStep(sellAvailable);

    this.setState({
      buyAvailable,
      buyStep,
      buyMarks: getMarks(buyAvailable),
      sellAvailable,
      sellStep,
      sellMarks: getMarks(sellAvailable),
    });
  }

  // input组件的onchange
  buyInputChangeHandle = evt => {
    const value = parseFloat(evt.target.value);
    if (isNaN(value)) {
      this.setState({
        buyValue: 0,
        buyInputValue: '', // 允许用户删除输入框数字，按照0来处理
      });
    } else if (value !== this.state.buyValue || value === 0) {
      // 输入框内比如1.2000改为1.2没有区别，所以不会出发state变化
      this.setState({
        buyValue: value,
        buyInputValue: value,
      });
    }
  };

  // slide组件的onchange
  buyChangeHandle = value => {
    if (this.state.buyAvailable > 0) {
      this.setState({
        buyValue: value,
        buyInputValue: value.toFixed(4),
      });
    }
  };

  sellInputChangeHandle = evt => {
    const value = parseFloat(evt.target.value);
    if (isNaN(value)) {
      this.setState({
        sellValue: 0,
        sellInputValue: '',
      });
    } else if (value !== this.props.sellValue || value === 0) {
      this.setState({
        sellValue: value,
        sellInputValue: value,
      });
    }
  };

  sellChangeHandle = value => {
    if (this.state.sellAvailable > 0) {
      this.setState({
        sellValue: value,
        sellInputValue: value.toFixed(4),
      });
    }
  };

  render() {
    const { money, stock, left, right, rate } = this.props;
    const {
      buyAvailable,
      buyStep,
      buyValue,
      buyInputValue,
      buyMarks,
      sellAvailable,
      sellStep,
      sellValue,
      sellInputValue,
      sellMarks,
    } = this.state;

    return (
      <Row type="flex" justify="space-around" styleName="limit">
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
                <Input size="large" type="number" defaultValue={rate} />
                <span styleName="unit">{right}</span>
              </label>
            </dd>
            <dd styleName="covert">≈ 281.51 CNY</dd>
          </dl>

          <dl>
            <dt>买入量</dt>
            <dd>
              <label>
                <Input
                  size="large"
                  type="number"
                  onChange={this.buyInputChangeHandle}
                  value={buyInputValue}
                />
                <span styleName="unit">{left}</span>
              </label>
            </dd>
            <dd>
              <Slider
                marks={buyMarks}
                min={0}
                max={buyAvailable || 1}
                step={buyStep}
                value={buyValue}
                defaultValue={0}
                tipFormatter={null}
                onChange={this.buyChangeHandle}
              />
              <p styleName="range">
                <em>0 {left}</em>
                <em>
                  {buyAvailable.toFixed(4)} {left}
                </em>
              </p>
              <p styleName="amount">交易额 19752869136.000000 {right}</p>
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
                <Input size="large" type="number" defaultValue={rate} />
                <span styleName="unit">{right}</span>
              </label>
            </dd>
            <dd styleName="covert">≈ 281.51 CNY</dd>
          </dl>

          <dl>
            <dt>卖出量</dt>
            <dd>
              <label>
                <Input
                  size="large"
                  type="number"
                  onChange={this.sellInputChangeHandle}
                  value={sellInputValue}
                />
                <span styleName="unit">{left}</span>
              </label>
            </dd>
            <dd>
              <Slider
                marks={sellMarks}
                min={0}
                max={sellAvailable}
                step={sellStep}
                value={sellValue}
                defaultValue={0}
                tipFormatter={null}
                onChange={this.sellChangeHandle}
              />
              <p styleName="range">
                <em>0 {left}</em>
                <em>
                  {sellAvailable.toFixed(4)} {left}
                </em>
              </p>
              <p styleName="amount">交易额 19752869136.000000 {right}</p>
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
