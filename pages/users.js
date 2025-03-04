import { Table, Space, Button, Tag } from 'antd';
import { useState } from 'react';

export default function Users() {
  // 模拟用户数据
  const [data, setData] = useState([
    {
      key: '1',
      name: '张三',
      age: 32,
      address: '北京市朝阳区',
      tags: ['管理员'],
    },
    {
      key: '2',
      name: '李四',
      age: 42,
      address: '上海市浦东新区',
      tags: ['用户'],
    },
    {
      key: '3',
      name: '王五',
      age: 32,
      address: '广州市天河区',
      tags: ['VIP'],
    },
  ]);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => (
            <Tag color={tag === '管理员' ? 'red' : tag === 'VIP' ? 'gold' : 'green'} key={tag}>
              {tag}
            </Tag>
          ))}
        </>
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
      <h1>用户管理</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}