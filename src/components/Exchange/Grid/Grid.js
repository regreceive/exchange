import React from 'react';

import Header from '../Header';
import LeftSide from '../LeftSide';
import Notice from '../Notice';
import Mscy from '../Mscy';
import TradePanel from '../TradePanel';
import Order from '../Order';
import MarketTrade from '../MarketTrade';
import Chart from '../Chart';
import Depth from '../Depth';
import './Grid.css';

const Grid = () => {
  return (
    <div styleName="container">
      {/*头部*/}
      <div styleName="header">
        <Header />
      </div>
      {/*边栏*/}
      <div styleName="aside">
        {/*交易对*/}
        <LeftSide />
        <div />
        {/*通知*/}
        <Notice />
        <div />
      </div>
      {/*走势图*/}
      <div styleName="chart">
        <Chart />
      </div>
      {/*交易面板*/}
      <div styleName="trade-panel">
        <TradePanel />
      </div>
      {/*对手盘*/}
      <div styleName="order">
        <Order />
      </div>
      {/*深度图*/}
      <div styleName="depth">
        <Depth />
      </div>
      {/*实时成交*/}
      <div styleName="market-trades">
        <MarketTrade />
      </div>
      {/*币种信息*/}
      <div styleName="token-details">
        <Mscy />
      </div>
    </div>
  );
};

export default Grid;
