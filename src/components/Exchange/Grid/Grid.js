import React from 'react';

import Header from '../Header';

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
        <div />
        {/*通知*/}
        <div />
      </div>
      {/*走势图*/}
      <div styleName="chart" />
      {/*交易面板*/}
      <div styleName="trade-panel" />
      {/*对手盘*/}
      <div styleName="order" />
      {/*深度图*/}
      <div styleName="depth" />
      {/*实时成交*/}
      <div styleName="market-trades" />
      {/*币种信息*/}
      <div styleName="token-details" />
    </div>
  );
};

export default Grid;
