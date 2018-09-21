import React from 'react';

import Header from '../Header';
import Markets from '../Markets';
import Notice from '../Notice';
import Mscy from '../Mscy';
import TradePanel from '../TradePanel';
import Orders from '../Orders';
import Deals from '../Deals';
import KLine from '../KLine';
import Depth from '../Depth';
import './GridView.css';

const GridView = () => {
  return (
    <div styleName="container">
      {/*头部*/}
      <div styleName="header">
        <Header />
      </div>
      {/*边栏*/}
      <div styleName="aside">
        {/*行情*/}
        <Markets />
        {/*通知*/}
        <Notice />
      </div>
      {/*走势图*/}
      <div styleName="line">
        <KLine />
      </div>
      {/*交易面板*/}
      <div styleName="trade-panel">
        <TradePanel />
      </div>
      {/*对手盘*/}
      <div styleName="orders">
        <Orders />
      </div>
      {/*深度图*/}
      <div styleName="depth">
        <Depth />
      </div>
      {/*实时成交*/}
      <div styleName="deals">
        <Deals />
      </div>
      {/*币种信息*/}
      <div styleName="token-details">
        <Mscy />
      </div>
    </div>
  );
};

export default GridView;
