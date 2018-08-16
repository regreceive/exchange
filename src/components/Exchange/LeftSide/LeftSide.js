import React from 'react';
import { Tabs, Table, Input, Icon } from 'antd';
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
      <div styleName="switch_wrap" action="switch_quote">
        {/* <i styleName="hb_icon_split_coin" /> */}
        <Icon type="swap" />
        <b>cny</b>
      </div>
      <Tabs defaultActiveKey="1" onChange={callback} styleName="tab" size="small">
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
        <TabPane
          tab={
            <span>
              <Icon type="star" />
              自选
            </span>
          }
          key="5"
        >
          <Table2 />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default LeftSide;
