import React from 'react';
import { Table } from 'antd';
import './Order.css';
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London ',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney ',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London ',
  },
];
const Order = () => {
  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: text => {
        return <span style={{ color: '#ae4e54' }}>{text}</span>;
      },
    },
    {
      title: '价格(BTC)',
      dataIndex: 'age',
      key: 'age',
      width: '25%',
    },
    {
      title: '数量(ETC)',
      dataIndex: 'address',
      key: 'address',
      width: '25%',
    },
    {
      title: '累计(ETH)',
      dataIndex: 'address',
      key: 'key',
      width: '25%',
    },
  ];
  return (
    <div styleName="Order">
      <div styleName="head">
        <p>
          最新价&nbsp;
          <span id="tickerClose">280.41</span>
          <em styleName="uppercase" lazyfill="<%=quote%>">
            usdt
          </em>
          <span styleName="ticker uppercase">≈ 1953.05 cny</span>
        </p>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={this.handleChange}
        pagination={false}
        styleName="orderbox orderbox1"
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={this.handleChange}
        pagination={false}
        styleName="orderbox"
      />
    </div>
  );
};
export default Order;
