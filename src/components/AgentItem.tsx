import React from 'react';
import classes from './style.module.scss';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = { item: any; handleStop: () => void; onDelete: () => void };

const AgentItem: React.FC<OwnProps> = ({ item, handleStop, onDelete }) => {
  if (!item) {
    return null;
  }

  const {
    agentId,
    stateId,
    configuration: {
      setId: { symbol, interval },
    },
  } = item;

  console.log(item);
  // state Id statuses
  // { Inactive = 0, Active = 1, Scan = 2, EnterDeal = 3, WatchDeal = 4, TakeProfit = 5, Broken = 100 }

  // interval
  // {
  //   H1 = 0,
  //   H4 = 1,
  //   D1 = 2,
  //   W1 = 3,
  //   M1 = 4
  // }

  return (
    <div className={classes.list__item}>
      <Space size={8}>
        <div>{stateId}</div>
        <Link to={`/${agentId}`}>#{agentId}</Link>
        <div>
          {symbol}:{interval}
        </div>

        {/* number get from dealHistory */}
        <div>5 success dealHISTORY</div>
        <div>3 UNSECCESS dealHistory</div>
      </Space>
      <Space size={10} className={classes.actions}>
        <Button type="primary" onClick={handleStop}>
          stop
        </Button>
        <Button danger type="primary" onClick={onDelete}>
          kill
        </Button>
      </Space>
    </div>
  );
};

export default AgentItem;
