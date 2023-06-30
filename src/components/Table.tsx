import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';

const AgentTable: React.FC<{ data: any[] }> = ({ data }) => {
  console.log(data);
  const columns: ColumnsType<any> = [
    {
      title: 'Agent ID',
      dataIndex: 'agentId',
      key: 'agentId',
    },
    {
      title: 'State ID',
      dataIndex: 'stateId',
      key: 'stateId',
    },
    {
      title: 'Configuration',
      dataIndex: 'configuration',
      key: 'configuration',
      render: (value: any) => {
        return (
          <pre style={{ maxHeight: '250px', overflowY: 'scroll' }}>
            {JSON.stringify(value, null, 2)}
          </pre>
        );
      },
    },
    {
      title: 'Deals History',
      dataIndex: 'dealHistory',
      key: 'dealHistory',
      render: (deals: any[]) => {
        return <div>{deals.join(', ')}</div>;
      },
    },
    {
      title: 'Logs',
      dataIndex: 'logs',
      key: 'logs',
      render: (logs: any[]) => {
        return <div>{logs.join(', ')}</div>;
      },
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default AgentTable;
