import React from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import AgentTable from './components/Table';
import { client } from './api/client';
// import styles from './index.module.scss'; // Import SCSS module styles

class PostStore {
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
}

const postStore = new PostStore();

const App = observer(() => {
  const [agents, setAgents] = React.useState<any[]>([]);

  const fetchAgents = async () => {
    const resp = await postStore.getAgents();

    setAgents(resp?.data);
  };

  React.useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div>
      <h1>Hello, Sanyek! {`>:D`}</h1>
      <AgentTable data={agents} />
    </div>
  );
});

export default App;
