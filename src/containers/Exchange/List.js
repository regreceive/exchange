import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';

@connect(store => {
  let tokens = store.exchange.tokens;
  const itemCoin = store.exchange.configs.itemCoin;
  tokens = Object.keys(tokens).map(key => {
    return {
      coin: key,
      price: tokens[key][itemCoin].price,
      change: tokens[key][itemCoin].change,
      key,
    };
  });

  return {
    translate: getTranslate(store.locale),
    tokens,
  };
})
export default class Layout extends React.Component {
  render() {
    console.log(this.props.tokens);
    const { translate } = this.props;
    const columns = [
      {
        title: translate('exchange.coin'),
        dataIndex: 'coin',
        width: '33%',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: translate('exchange.last_price'),
        dataIndex: 'price',
        width: '33%',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: translate('exchange.change'),
        dataIndex: 'change',
        width: '33%',
        sorter: (a, b) => a.address.length - b.address.length,
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={this.props.tokens}
        pagination={false}
      />
    );
  }
}
