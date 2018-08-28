import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';
import uuid from 'uuid/v1';

import constants from '../../../services/constants';

@connect(store => {
  let { markets } = store.exchange;
  const { coins } = markets;

  markets = coins.map(coin => {
    return {
      coin: coin[0],
      price: coin[1],
      change: coin[2],
      key: uuid(),
    };
  });

  return {
    translate: getTranslate(store.locale),
    markets,
  };
})
export default class List extends React.Component {
  render() {
    const { translate } = this.props;
    const columns = [
      {
        title: translate('exchange.coin'),
        dataIndex: 'coin',
        width: '33%',
        sorter: (a, b) => a.coin - b.coin,
      },
      {
        title: translate('exchange.last_price'),
        dataIndex: 'price',
        width: '34%',
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: translate('exchange.change'),
        dataIndex: 'change',
        width: '33%',
        sorter: (a, b) => a.change - b.change,
        render: value => {
          let color = '#fff';
          let plus = '+';
          if (value >= 0) {
            color = constants.COLOR_RAISE;
          } else {
            color = constants.COLOR_FALL;
            plus = '';
          }

          return <span style={{ color }}>{plus + value}%</span>;
        },
      },
    ];

    return (
      <div className={this.props.className}>
        <Table
          columns={columns}
          dataSource={this.props.markets}
          pagination={false}
        />
      </div>
    );
  }
}
