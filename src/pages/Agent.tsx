import React from 'react';
import { Layout } from '../components/Layout';
import { useParams } from 'react-router-dom';

const AgentPage = () => {
  const { id } = useParams();

  return (
    <Layout title={`Agent: ${id}`} backArrow={true}>
      Workiung
    </Layout>
  );
};

export default AgentPage;
