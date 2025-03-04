import { Table, Space, Button, Tag, Image } from 'antd';
import { useState } from 'react';

export default function Products() {
  // 模拟产品数据
  const [data, setData] = useState([
    {
      key: '1',
      name: '笔记本电脑',
      price: 5999,
      stock: 100,
      status: '在售',
    },
    {
      key: '2',
      name: '智能手机',
      price: 2999,
      stock: 200,
      status: '在售',
    },
    {
      key: '3',
      name: '平板电脑',
      price: 3999,
      stock: 0,
      status: '缺货',
    },
  ]);

  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格 (元)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <Tag color={status === '在售' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">编辑</Button>
          <Button type="link" danger>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>产品管理</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}