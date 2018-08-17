import React from 'react';
import { Table } from 'antd';

const List = () => {
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
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default List;
