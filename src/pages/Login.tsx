import React from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { Layout } from '../components/Layout';
import { IronManChest } from '../components/IronManChest';

const { Text } = Typography;

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => (
  <Layout
    title={
      <Text
        style={{
          width: '100%',
          textAlign: 'center',
          display: 'block',
          fontSize: '36px',
        }}
      >
        Login
      </Text>
    }
  >
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, margin: '0 auto' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    <IronManChest className="svg" />
  </Layout>
);

export default Login;
