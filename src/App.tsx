import React from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import AgentTable from './components/Table';
import { client } from './api/client';
import { Button, message } from 'antd';
// import styles from './index.module.scss'; // Import SCSS module styles

class AgentStore {
  posts = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getAgents() {
    try {
      const response = await client.get<any>('/agent');
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async createAgent(agent: any) {
    try {
      const response = await client.post<any>('/agent/spawn', agent);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAgent(agentId: string) {
    try {
      const response = await client.post<any>(`/agent/kill/${agentId}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export const agentStore = new AgentStore();

const testAgent = {
  investment: 42,
  updatesPerInterval: 421,
  setId: {
    symbol: 'SOLUSDT',
    interval: 3,
  },
  takeProfit: 0.4,
  stopLoss: 0.1,
  methodConfig: {
    MethodName: 'macd-rsi',
    MethodConfigProperties: {
      Properties: {
        MinGrowthIntervals: 2.6,
        MacdSignalScale: 1.8,
        MinRsiModification: 1.9,
        MaxRsiModification: 2.5,
        SignalThreshold: 0.6,
      },
    },
  },
};

const App = observer(() => {
  const [agents, setAgents] = React.useState<any[]>([]);

  const fetchAgents = async () => {
    const resp = await agentStore.getAgents();

    setAgents(resp?.data);
  };

  React.useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div>
      <h1>Hello, Sanyek! {`>:D`}</h1>
      <Button
        type="primary"
        onClick={async () => {
          const min = 10;
          const max = 100;
          const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
          try {
            const data = await agentStore.createAgent({
              ...testAgent,
              investment: randomNum,
            });

            await fetchAgents();
          } catch (error) {
            message.error('Oops, ne ne ne');
          }
        }}
      >
        Create
      </Button>
      <AgentTable data={agents} refetchAgents={() => fetchAgents()} />
    </div>
  );
});

export default App;
