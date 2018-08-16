import React from 'react';
import { Table } from 'antd';
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: '+0.8',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: '-0.1',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: '-1.5',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: '+0.5',
  },
];
const Table2 = () => {
  const columns = [
    {
      title: '币种',
      dataIndex: 'name',
      key: 'name',
      width: '33%',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: '最新价',
      dataIndex: 'age',
      key: 'age',
      width: '33%',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: '涨幅',
      dataIndex: 'address',
      key: 'address',
      width: '33%',
      sorter: (a, b) => a.address - b.address,
      render: (text, record) => {
        return text.substr(0, 1) == '+' ? (
          <span style={{ color: '#589065' }}>{text}</span>
        ) : (
          <span style={{ color: '#ae4e54' }}>{text}</span>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={data} onChange={this.handleChange} pagination={false} />;
};
export default Table2;
