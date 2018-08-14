import React from 'react';
import { Tabs, Input } from 'antd';
import './TradePanel.css';
const TabPane = Tabs.TabPane;
function callback(key) {
  console.log(key);
}
const TradePanel = () => {
  return (
    <div styleName="trade">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="限价交易" key="1">
          222222
        </TabPane>
        <TabPane tab="市价交易" key="2">
          111111
        </TabPane>
      </Tabs>
    </div>
  );
};
export default TradePanel;
