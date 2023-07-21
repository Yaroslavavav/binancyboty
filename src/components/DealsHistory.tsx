import React from 'react';
import { Space, Tooltip, Typography } from 'antd';
import clsx from 'classnames';
import classes from './style.module.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = { deals: any; bigIcon?: boolean };

const { Text } = Typography;

const DealsHistory: React.FC<OwnProps> = ({ deals = [], bigIcon = false }) => {
  if (!deals.length)
    return (
      <Space>
        <Tooltip title="Success dealse">
          <Text className={clsx(classes.deals__item, classes.success)}>0</Text>
        </Tooltip>
        <Tooltip title="Failed dealse">
          <Text className={clsx(classes.deals__item, classes.error)}>0</Text>
        </Tooltip>
      </Space>
    );

  return (
    <Space>
      <Tooltip title="Success dealse">
        <Text className={clsx(classes.deals__item, classes.success)}> 3</Text>
      </Tooltip>
      <Tooltip title="Failed dealse">
        <Text className={clsx(classes.deals__item, classes.error)}>5</Text>
      </Tooltip>
    </Space>
  );
};

export default DealsHistory;
