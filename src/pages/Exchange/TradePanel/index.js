import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';
import { Tabs } from 'antd';

import Limit from './Limit';
import Market from './Market';
import './TradePanel.css';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    symbol: store.exchange.configs.symbol,
    assets: store.user.assets,
  };
})
export default class extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="限价交易" key="1">
            <Limit />
          </Tabs.TabPane>
          <Tabs.TabPane tab="市价交易" key="2">
            <Market />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}
