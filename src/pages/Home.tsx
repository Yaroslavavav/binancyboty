import React from 'react';
import { Typography, Button, Modal, message } from 'antd';

import { Layout } from '../components/Layout';
import { AgentsList } from '../components/AgentList';
import AgentForm from '../components/FormAgent';

import classes from './style.module.scss';
import { intervalStatusesInverted } from '../constants';
import { inject, observer } from 'mobx-react';
import { Stores } from '../store';

// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = {};

interface InjectedProps {
  agentsStore: Stores['agentsStore'];
}

type Props = OwnProps & InjectedProps;

function HomePage({ agentsStore }: Props): React.ReactElement {
  const [agentModal, setModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { createAgent, getAgentsList } = agentsStore;

  const onFinish = async (values: any) => {
    const {
      symbol,
      interval,
      investment,
      stopLoss,
      takeProfit,
      updatesPerInterval,
    } = values;

    const agentParams: any = {
      investment: Number(investment),
      stopLoss: Number(stopLoss),
      takeProfit: Number(takeProfit),
      updatesPerInterval: Number(updatesPerInterval),
    };

    agentParams.setId = {
      symbol,
      interval,
    };

    try {
      const methodConfigObject = JSON.parse(`{${values.methodConfig}}`);
      agentParams.methodConfig = { ...methodConfigObject };
    } catch (error) {
      message.error('Error parsing json method config');
    }
    setLoading(true);
    try {
      const data = await createAgent(agentParams);
      if (data?.status === 200) {
        message.success('New Agent successfully created', 5);
        getAgentsList();
        setModal(false);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      message.error('Error creating agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout
        title={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography.Text style={{ fontSize: '28px' }}>
              Agent List
            </Typography.Text>
            <Button type="primary" onClick={() => setModal(true)}>
              {' '}
              + Create agent
            </Button>
          </div>
        }
      >
        <AgentsList />
      </Layout>
      <Modal
        open={agentModal}
        wrapClassName={classes.agentModal}
        onCancel={() => setModal(false)}
        footer={false}
      >
        <AgentForm
          onCancel={() => setModal(false)}
          onFinish={(values) => onFinish(values)}
          loading={loading}
        />
      </Modal>
    </>
  );
}

export default inject(
  ({ agentsStore }: Stores): InjectedProps => ({
    agentsStore,
  })
)(observer(HomePage)) as unknown as React.ComponentType<OwnProps>;
