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
    configuration: {
      setId: { symbol, interval },
    },
  } = item;

  console.log(item);

  return (
    <div className={classes.list__item}>
      <Space size={8}>
        <Link to={`/${agentId}`}>#{agentId}</Link>
        <div>
          {symbol}:{interval}
        </div>
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
