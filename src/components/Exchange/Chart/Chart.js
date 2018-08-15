import React from 'react';
import './Chart.css';
const Chart = () => {
  return (
    <div styleName="chart">
      <div styleName="hd">
        <dl styleName="ticker_wrap upper" id="ticker_wrap">
          <dt>
            ETH/BTC
            <span styleName="ticker_close">0.044311</span>
          </dt>
          <dd>
            <span id="tickerCny_ticker_bar">≈ 1959.13 cny</span>
          </dd>
          <dd>
            涨幅{' '}
            <span name="rate" styleName="color_up">
              +2.84%
            </span>
          </dd>
          <dd>
            高 <span name="high">0.046368</span>
          </dd>
          <dd>
            低 <span name="low">0.041000</span>
          </dd>
          <dd>
            24H量 <span name="amount">132136 ETH</span>
          </dd>
        </dl>
      </div>
    </div>
  );
};
export default Chart;
