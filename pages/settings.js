import { Form, Input, Button, Switch, Select, Divider, message } from 'antd';
import { useState } from 'react';

const { Option } = Select;

export default function Settings() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // 模拟保存设置
    setTimeout(() => {
      console.log('设置已保存:', values);
      message.success('设置已保存');
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h1>系统设置</h1>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          siteName: '企业管理中台',
          logo: '',
          theme: 'light',
          enableNotifications: true,
          pageSize: 10
        }}
        onFinish={onFinish}
      >
        <Divider orientation="left">基本设置</Divider>
        <Form.Item
          name="siteName"
          label="站点名称"
          rules={[{ required: true, message: '请输入站点名称!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="logo"
          label="Logo URL"
        >
          <Input placeholder="请输入Logo URL" />
        </Form.Item>
        <Form.Item
          name="theme"
          label="界面主题"
        >
          <Select>
            <Option value="light">浅色</Option>
            <Option value="dark">深色</Option>
          </Select>
        </Form.Item>

        <Divider orientation="left">功能设置</Divider>
        <Form.Item
          name="enableNotifications"
          label="启用通知"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="pageSize"
          label="默认分页大小"
        >
          <Select>
            <Option value={10}>10条/页</Option>
            <Option value={20}>20条/页</Option>
            <Option value={50}>50条/页</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存设置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}