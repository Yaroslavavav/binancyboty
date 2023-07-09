import React from 'react';
import { Layout } from '../components/Layout';
import { AgentsList } from '../components/AgentList';

const HomePage = () => {
  return (
    <Layout title="Agent list">
      <AgentsList />
    </Layout>
  );
};

export default HomePage;
