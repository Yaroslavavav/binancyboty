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
      width: '5%',
    },
    {
      title: 'State ID',
      dataIndex: 'stateId',
      key: 'stateId',
      width: '5%',
    },
    {
      title: 'Configuration',
      dataIndex: 'configuration',
      key: 'configuration',
      width: '20%',
      render: (value: any) => {
        return (
          <pre
            style={{
              maxHeight: '250px',
              overflowY: 'scroll',
              fontWeight: 'bold',
              backgroundColor: `rgba(64, 201, 3, 0.2)`,
            }}
          >
            {JSON.stringify(value, null, 2)}
          </pre>
        );
      },
    },
    {
      title: 'Deals History',
      dataIndex: 'dealHistory',
      key: 'dealHistory',
      width: '10%',
      render: (deals: any[]) => {
        return <div>{deals.join(', ')}</div>;
      },
    },
    {
      title: 'Logs',
      dataIndex: 'logs',
      key: 'logs',
      width: '15%',
      render: (logs: any[]) => {
        return <div>{logs.join(', ')}</div>;
      },
    },
    {
      title: 'Actions',
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
        scroll={{ x: 950, y: 'calc(100vh - 220px)' }}
        pagination={false}
      />
    </div>
  );
};

export default AgentTable;
