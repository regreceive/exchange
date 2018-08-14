import React from 'react';
import { Table } from 'antd';
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
const Table2 = () => {
  const columns = [
    {
      title: 'bizhong',
      dataIndex: 'name',
      key: 'name',
      width: '33%',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '33%',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '33%',
      sorter: (a, b) => a.address.length - b.address.length,
    },
  ];
  return <Table columns={columns} dataSource={data} onChange={this.handleChange} pagination={false} />;
};
export default Table2;
