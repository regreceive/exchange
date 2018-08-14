import React from 'react';
import { Tabs, Table, Input } from 'antd';
import './LeftSide.css';
import Table2 from './Table2';
import Table1 from './Table1';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
function callback(key) {
  console.log(key);
}
const LeftSide = () => {
  return (
    <div styleName="drawer">
      <strong>市场</strong>
      <div styleName="search_wrap">
        <Search onSearch={value => console.log(value)} size="small" />
      </div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="USDT" key="1">
          <Table1 />
        </TabPane>
        <TabPane tab="BTC" key="2">
          <Table2 />
        </TabPane>
        <TabPane tab="ETH" key="3">
          <Table2 />
        </TabPane>
        <TabPane tab="HT" key="4">
          <Table2 />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default LeftSide;
