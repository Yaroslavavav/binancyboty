import React from 'react';
import { useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import {
  Col,
  Row,
  message,
  Typography,
  Space,
  Card,
  Tabs,
  TabsProps,
  List,
  Spin,
} from 'antd';
import clsx from 'classnames';

import { Stores } from '../store';
import { intervalStatuses, stateIdStatuses } from '../constants';

import { Layout } from '../components/Layout';
import DealsHistory from '../components/DealsHistory';

import classes from './style.module.scss';
// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = {};

interface InjectedProps {
  agentsStore: Stores['agentsStore'];
}

type Props = OwnProps & InjectedProps;

const { Text } = Typography;

function RawAgentPage({ agentsStore }: Props): React.ReactElement {
  const { id = '' } = useParams();

  const { singleAgent, getAgent, setSingleAgent } = agentsStore;

  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchAgent = React.useCallback(async (agentId: string) => {
    try {
      await getAgent(agentId);
    } catch (error) {
      console.log(error);
      message.error(`Something went wrong: ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchAgent(id);

    return () => setSingleAgent(null);
  }, [id]);

  if (!singleAgent && loading) {
    return <Spin style={{ width: '100%', margin: '20% auto' }} />;
  }

  if (!singleAgent && !loading) {
    return (
      <Layout
        title={
          <Space>
            <Text className={classes.header__id}>{id}</Text>
          </Space>
        }
        backArrow={true}
        loading={!singleAgent && loading}
        empty={!singleAgent && !loading}
      >
        <div>Something went wrong</div>
      </Layout>
    );
  }

  const {
    stateId,
    dealHistory,
    configuration: {
      setId: { symbol, interval },
    },
    logs,
  } = singleAgent;

  const agentActiveStatus =
    stateId >= 3 && stateId <= 5 ? 'Active' : 'Unactive';

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Overview`,
      children: (
        <Row gutter={24} className={classes.main__wrapper}>
          <Col span={14}>
            <Space size={16} align="center">
              <div className={classes.main__icon}>
                {stateIdStatuses[stateId].icon}
              </div>
              <Text className={classes.main__status}>
                {stateIdStatuses[stateId].label}
              </Text>
              <DealsHistory deals={dealHistory} bigIcon />
            </Space>
          </Col>
          <Col span={10}>
            <Card
              title={
                <Space className={classes.card__row}>
                  <Text
                    style={{
                      backgroundColor: `${
                        agentActiveStatus === 'Active' ? '#00ce06' : 'darkgrey'
                      }`,
                    }}
                    className={classes.agentStatus}
                  >
                    {agentActiveStatus}
                  </Text>
                  <Text>22.05.03 12:12:12</Text>
                </Space>
              }
            >
              <Space className={classes.card__row}>
                <Text className={classes.card__text}>Enter Price</Text>
                <Text className={classes.card__text}>1000$</Text>
              </Space>
              <Space className={classes.card__row}>
                <Text className={classes.card__text}>Current Price</Text>
                <Text className={classes.card__text}>1100$</Text>
              </Space>
              <Space className={classes.card__row}>
                <Text className={classes.card__text}>Profit</Text>
                <Text className={classes.card__text}>10%</Text>
              </Space>
              <Space className={classes.card__row}>
                <Text className={classes.card__text}>Time Passed</Text>
                <Text className={classes.card__text}>7:23:23</Text>
              </Space>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: '2',
      label: `Logs`,
      children: (
        <List
          header={false}
          footer={false}
          bordered
          dataSource={logs}
          renderItem={(item: string) => (
            <List.Item>
              <Text copyable>{item}</Text>
            </List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <Layout
      title={
        <Space className={classes.header__wrapper} size={12}>
          <Text className={classes.header__id}>#{id}</Text>
          <Text className={classes.header__symbol}>
            {symbol}:{intervalStatuses[interval]}
          </Text>
        </Space>
      }
      backArrow={true}
      loading={!singleAgent && loading}
      empty={!singleAgent && !loading}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </Layout>
  );
}

export default inject(
  ({ agentsStore }: Stores): InjectedProps => ({
    agentsStore,
  })
)(observer(RawAgentPage)) as unknown as React.ComponentType<OwnProps>;
