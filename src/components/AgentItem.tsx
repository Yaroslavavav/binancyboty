import React from 'react';
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Tooltip,
  Typography,
  message,
} from 'antd';
import { Link } from 'react-router-dom';

import { intervalStatuses, stateIdStatuses } from '../constants';
import DealsHistory from './DealsCounters';

import classes from './style.module.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = { item: any; handleStop: () => void; onDelete: () => void };

const { Text } = Typography;

const AgentItem: React.FC<OwnProps> = ({ item, handleStop, onDelete }) => {
  if (!item) {
    return null;
  }

  const [passcode, setPasscode] = React.useState<string>('');

  const {
    agentId,
    stateId,
    dealHistory,
    configuration: {
      setId: { symbol, interval },
    },
  } = item;

  return (
    <div className={classes.list__item}>
      <Link to={`/${agentId}`} style={{ cursor: 'pointer' }}>
        <Space size={10} className={classes.list__item_left}>
          <Tooltip title={stateIdStatuses[stateId].label}>
            {stateIdStatuses[stateId].icon}
          </Tooltip>
          <Text style={{ fontSize: '16px' }}>#{agentId}</Text>
          <Text style={{ fontWeight: 'bold' }}>
            {symbol}:{intervalStatuses[interval]}
          </Text>
          <DealsHistory deals={dealHistory || []} />
        </Space>
      </Link>
      <Space size={10} className={classes.actions}>
        <Button type="primary" onClick={handleStop}>
          stop
        </Button>
        <Popconfirm
          title="Delete the agent"
          description={
            <Space direction="vertical" size={6}>
              <Text>{`Are you sure to delete this agent: #${agentId}?`}</Text>
              <Input
                placeholder="write pass code"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
            </Space>
          }
          onConfirm={() => {
            if (passcode === '1100') {
              onDelete();
              setPasscode('');
            } else {
              message.error('Wrong passcode');
            }
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button danger type="primary">
            kill
          </Button>
        </Popconfirm>
      </Space>
    </div>
  );
};

export default AgentItem;
