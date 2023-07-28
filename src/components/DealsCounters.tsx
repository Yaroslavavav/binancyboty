import React from 'react';
import { Space, Tooltip, Typography } from 'antd';
import clsx from 'classnames';
import classes from './style.module.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
type OwnProps = { deals: any; bigIcon?: boolean };

const { Text } = Typography;

const DealsCounters: React.FC<OwnProps> = ({ deals = [], bigIcon = false }) => {
  if (!deals.length)
    return (
      <Space>
        <Tooltip title="Success dealse">
          <Text className={clsx(classes.deals__item, classes.success)}>-</Text>
        </Tooltip>
        <Tooltip title="Failed dealse">
          <Text className={clsx(classes.deals__item, classes.error)}>-</Text>
        </Tooltip>
      </Space>
    );

  const dealsCounts = deals
    .filter((item: any) => item.complete)
    .reduce(
      (acc: any, curr: any) => {
        if (curr.success) {
          acc.successDeals++;
        } else {
          acc.errorDeals++;
        }
        return acc;
      },
      { successDeals: 0, errorDeals: 0 } as {
        successDeals: number;
        errorDeals: number;
      }
    );

  return (
    <Space>
      <Tooltip title="Success dealse">
        <Text className={clsx(classes.deals__item, classes.success)}>
          {dealsCounts.successDeals}
        </Text>
      </Tooltip>
      <Tooltip title="Failed dealse">
        <Text className={clsx(classes.deals__item, classes.error)}>
          {dealsCounts.errorDeals}
        </Text>
      </Tooltip>
    </Space>
  );
};

export default DealsCounters;
