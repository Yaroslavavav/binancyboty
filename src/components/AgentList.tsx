import React from 'react';
import { inject, observer } from 'mobx-react';
import { Empty, Spin, message } from 'antd';

import { Stores } from '../store/types';
import AgentItem from './AgentItem';
import classes from './style.module.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = {};

interface InjectedProps {
  agentsStore: Stores['agentsStore'];
}

type Props = OwnProps & InjectedProps;

function RawAgentsList({ agentsStore }: Props): React.ReactElement {
  const { agents, deleteAgent, getAgentsList } = agentsStore;

  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchAgents = React.useCallback(async () => {
    try {
      await getAgentsList();
    } catch (error) {
      console.log(error);
      message.error(`Something went wrong: ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchAgents();
  }, []);

  if (!agents.length && loading) {
    return <Spin style={{ width: '100%', margin: '0 auto' }} />;
  }

  if (!agents.length && !loading) {
    return <Empty style={{ width: '100%', margin: '0 auto' }} />;
  }

  return (
    <div className={classes.list}>
      {agents.map((item: any) => (
        <AgentItem
          key={item.agentId}
          item={item}
          handleStop={() => console.log('lol')}
          onDelete={async () => {
            try {
              setLoading(true);
              await deleteAgent(item.agentId);
            } catch (error) {
              console.log(error);
              message.error(`Oops, try again later, error: ${error} `);
            } finally {
              setLoading(false);
            }
          }}
        />
      ))}
    </div>
  );
}

export const AgentsList = inject(
  ({ agentsStore }: Stores): InjectedProps => ({
    agentsStore,
  })
)(observer(RawAgentsList)) as unknown as React.ComponentType<OwnProps>;
