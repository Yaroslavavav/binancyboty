import { Button, message } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';
import { agentStore } from '../App';

const AgentTable: React.FC<{ data: any[]; refetchAgents: () => void }> = ({
  data,
  refetchAgents,
}) => {
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
      width: '30%',
      render: (logs: any[]) => {
        return <div>{logs.join(', ')}</div>;
      },
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      width: '5%',
      render: (_: any, record: any) => {
        return (
          <Button
            type="primary"
            style={{ backgroundColor: 'tomato' }}
            onClick={async () => {
              try {
                const data = await agentStore.deleteAgent(record.agentId);
                console.log(data);

                await refetchAgents();
              } catch (error) {
                message.error('Ne mojna');
              }
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        dataSource={data}
        rowKey={(item) => item.agentId}
        columns={columns}
      />
    </div>
  );
};

export default AgentTable;
