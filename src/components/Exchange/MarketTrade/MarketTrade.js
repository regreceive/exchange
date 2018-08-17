import React from 'react';
import { Table } from 'antd';
import './MarketTrade.css';
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
const MarketTrade = () => {
  const columns = [
    {
      title: '时间',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: '方向',
      dataIndex: 'age',
      key: 'age',
      width: '25%',
    },
    {
      title: '价格(BTC)',
      dataIndex: 'address',
      key: 'address',
      width: '25%',
    },
    {
      title: '数量(ETC)',
      dataIndex: 'address',
      key: 'address',
      width: '25%',
    },
  ];
  return (
    <div styleName="MarketTrade">
      <div styleName="head">
        <span>实时成交</span>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={this.handleChange}
        pagination={false}
        styleName="tradebox"
      />
    </div>
  );
};
export default MarketTrade;
