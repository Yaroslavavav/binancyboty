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

import dayjs, { Dayjs } from 'dayjs';
import { Stores } from '../store';
import { intervalStatuses, stateIdStatuses } from '../constants';

import { Layout } from '../components/Layout';
import DealsHistory from '../components/DealsCounters';

import classes from './style.module.scss';
// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = {};

interface InjectedProps {
  agentsStore: Stores['agentsStore'];
}

type Props = OwnProps & InjectedProps;

function calculateTimeDifference(dateString: string) {
  const timeNow = dayjs();
  const date = dayjs(dateString);
  const differenceInMilliseconds = date.diff(timeNow);

  const isPast = differenceInMilliseconds < 0;
  const timeUnits = [
    { unit: 'day', milliseconds: 86400000 },
    { unit: 'hour', milliseconds: 3600000 },
    { unit: 'minute', milliseconds: 60000 },
    { unit: 'second', milliseconds: 1000 },
  ];

  let formattedDifference = '';
  let remainingDifference = Math.abs(differenceInMilliseconds);

  for (const { unit, milliseconds } of timeUnits) {
    const value = Math.floor(remainingDifference / milliseconds);
    if (value > 0) {
      formattedDifference += `${value} ${unit === 'day' ? unit : ':'} `;
      remainingDifference -= value * milliseconds;
    }
  }

  return isPast ? `${formattedDifference}` : `In ${formattedDifference}`;
}

function cleanTimeString(inputString: string) {
  // Remove whitespaces between colons
  const cleanedString = inputString.replace(/ : /g, ':');

  // Remove the last colon
  const lastIndex = cleanedString.lastIndexOf(':');
  const resultString =
    cleanedString.substring(0, lastIndex) +
    cleanedString.substring(lastIndex + 1);

  return resultString;
}

const findLatestItemByDay = (items: any[]) => {
  let latestItem: any = null;
  let latestDate: Dayjs | null = null;

  items.forEach((item) => {
    const enterTime = dayjs(item.enterTime);
    if (!latestDate || enterTime.isAfter(latestDate, 'day')) {
      latestDate = enterTime;
      latestItem = item;
    }
  });

  return latestItem;
};

const { Text } = Typography;

function RawAgentPage({ agentsStore }: Props): React.ReactElement {
  const { id = '' } = useParams();

  const { singleAgent, getAgent, setSingleAgent, refreshAgentPriceInfo } =
    agentsStore;

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

    const setIntervalId = setInterval(async () => {
      await refreshAgentPriceInfo(id);
    }, 5000);

    return () => {
      setSingleAgent(null);
      clearInterval(setIntervalId);
    };
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
    stateId = '',
    dealHistory = [],
    binanceInfo = {},
    configuration,
    logs = [],
  } = singleAgent;

  const lastActiveDeal =
    findLatestItemByDay(dealHistory.filter((item: any) => !item.complete)) ||
    {};

  const agentActiveStatus =
    stateId >= 3 && stateId <= 5 ? 'Active' : 'Unactive';

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Deals history`,
      children: (
        <List
          header={false}
          footer={false}
          bordered
          dataSource={dealHistory}
          renderItem={(item: string) => {
            return (
              <List.Item>
                <Space size={10}>
                  <Text>profit%</Text>
                  <Text>test</Text>
                  <Text>test</Text>
                </Space>
              </List.Item>
            );
          }}
        />
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
          dataSource={logs.slice().reverse()}
          renderItem={(item: string) => (
            <List.Item>
              <Text copyable>{item}</Text>
            </List.Item>
          )}
        />
      ),
    },
  ];

  const { enterPrice, enterTime } = lastActiveDeal;

  const { profit, currentPrice } = binanceInfo;

  const timePassed = calculateTimeDifference(enterTime);

  return (
    <Layout
      title={
        <Row gutter={24} className={classes.main__header}>
          <Col span={14}>
            <Space className={classes.header__wrapper} size={12}>
              <Text className={classes.header__id}>#{id}</Text>
              <Space direction="vertical" size={2}>
                <Text className={classes.header__symbol}>
                  {configuration?.setId?.symbol}:
                  {intervalStatuses[configuration?.setId?.interval]}
                </Text>
                <Space size={12} align="center">
                  <div className={classes.main__icon}>
                    {stateIdStatuses[stateId]?.icon}
                  </div>
                  <Text className={classes.main__status}>
                    {stateIdStatuses[stateId]?.label}
                  </Text>
                  <div className={classes.main__dealsHistory}>
                    <DealsHistory deals={dealHistory} />
                  </div>
                </Space>
              </Space>
            </Space>
          </Col>
          <Col span={10}>
            <Card
              className={classes.card__wrapper}
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
                  <Text>{dayjs(enterTime).format('DD.MM.YYYY H:mm:ss')}</Text>
                </Space>
              }
            >
              <Space className={classes.card__row}>
                <Text className={classes.card__text}>Enter Price</Text>
                <Text className={classes.card__text}>{enterPrice || '-'}$</Text>
              </Space>
              <Space className={classes.card__row}>
                <Text className={classes.card__text}>Current Price</Text>
                <Text className={classes.card__text}>{currentPrice}$</Text>
              </Space>
              <Space className={classes.card__row}>
                <Text className={classes.card__text}>Profit</Text>
                <Text className={classes.card__text}>{profit}%</Text>
              </Space>
              <Space className={classes.card__row}>
                <Text className={classes.card__text}>Time Passed</Text>
                <Text className={classes.card__text}>
                  {cleanTimeString(timePassed)}
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>
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
