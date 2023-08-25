import React from 'react';
import { Button, Form, Input, Select, Space } from 'antd';

import { intervalStatuses } from '../constants';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const setIdIntervalOptions = Object.entries(intervalStatuses).map(
  ([key, value]) => ({ value: Number(key), label: value })
);

const validateNumberWithDot = (rule: any, value: any, callback: any) => {
  const regex = /^[0-9.]+$/;
  if (!regex.test(value)) {
    callback('Please enter a valid number');
  } else {
    callback();
  }
};

const AgentForm: React.FC<{
  onCancel: () => void;
  onFinish: (params: any) => void;
  loading: boolean;
}> = ({ onCancel, onFinish, loading }) => {
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 800 }}
    >
      <Form.Item name="symbol" label="Symbol (setId.interval)">
        <Input />
      </Form.Item>
      <Form.Item name="interval" label="Interval (setId.interval)">
        <Select options={setIdIntervalOptions} />
      </Form.Item>
      <Form.Item
        name="investment"
        label="Investment"
        rules={[
          {
            type: 'regexp',
            pattern: new RegExp(/^[0-9.]+$/),
            message: 'Only numbers',
          },
          { validator: validateNumberWithDot },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="updatesPerInterval"
        label="Updates/Interval"
        rules={[
          {
            type: 'regexp',
            pattern: new RegExp(/^[0-9.]+$/),
            message: 'Only numbers',
          },
          { validator: validateNumberWithDot },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="takeProfit"
        label="Take Profit"
        rules={[
          {
            type: 'regexp',
            pattern: new RegExp(/^[0-9.]+$/),
            message: 'Only numbers',
          },
          { validator: validateNumberWithDot },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="stopLoss"
        label="Stop loss"
        rules={[
          {
            type: 'regexp',
            pattern: new RegExp(/^[0-9.]+$/),
            message: 'Only numbers',
          },
          { validator: validateNumberWithDot },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="methodConfig"
        label="Method Config"
        rules={[{ required: true }]}
      >
        <Input.TextArea style={{ minHeight: '220px' }} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }} size={8}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button loading={loading} type="primary" htmlType="submit">
            Spawn
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default AgentForm;
