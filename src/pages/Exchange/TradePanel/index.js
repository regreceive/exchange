import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';
import { Tabs } from 'antd';

import * as user from '../../../actions/userActions';
import Limit from './Limit';
import Market from './Market';
import './TradePanel.css';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    symbol: store.exchange.configs.symbol,
    latest: store.exchange.latest,
    assets: store.user.assets,
  };
})
export default class extends React.Component {
  render() {
    const { symbol, assets, latest } = this.props;
    const [left, right] = symbol.split('_');
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="限价交易" key="1">
            <Limit
              stock={assets[left]}
              money={assets[right]}
              left={left}
              right={right}
              rate={latest[0]}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="市价交易" key="2">
            <Market
              stock={assets[left]}
              money={assets[right]}
              left={left}
              right={right}
              rate={latest[0]}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}
