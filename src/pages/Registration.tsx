import React from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { Layout } from '../components/Layout';
import { authApi } from '../api/auth';

const { Text } = Typography;

const onFinish = async (values: any) => {
  const data = await authApi.registration(values);

  if (data) {
    console.log('do somethign');
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  userName?: string;
  password?: string;
  binanceApiKey?: string;
  binanceApiSecret?: string;
  rememberMe?: string;
};

const Registration: React.FC = () => (
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
        Registration
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
        name="userName"
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
      <Form.Item<FieldType>
        label="Binance Key"
        name="binanceApiKey"
        rules={[{ required: true, message: 'Please enter secret key!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<FieldType>
        label="Binance Secret"
        name="binanceApiSecret"
        rules={[{ required: true, message: 'Please enter binance secret!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="rememberMe"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Layout>
);

export default Registration;
