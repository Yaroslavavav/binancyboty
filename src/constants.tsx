import React from 'react';
import {
  CloseCircleOutlined,
  DollarOutlined,
  EyeOutlined,
  HeartOutlined,
  LoadingOutlined,
  NodeIndexOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';

export const intervalStatuses: { [key: number]: string } = {
  0: 'H1',
  1: 'H4',
  2: 'D1',
  3: 'W1',
  4: 'M1',
};

export const stateIdStatuses: {
  [key: number]: { label: string; icon: React.ReactNode };
} = {
  0: {
    label: 'Inactive',
    icon: <PauseCircleOutlined style={{ color: '#ffcc33', fontSize: 24 }} />,
  },
  1: {
    label: 'Active',
    icon: <HeartOutlined style={{ color: '#eb0c00', fontSize: 24 }} />,
  },
  2: {
    label: 'Scan',
    icon: <LoadingOutlined style={{ color: '#2389da', fontSize: 24 }} />,
  },
  3: {
    label: 'EnterDeal',
    icon: <NodeIndexOutlined style={{ color: '#aa2769', fontSize: 24 }} />,
  },
  4: {
    label: 'WatchDeal',
    icon: <LoadingOutlined style={{ color: '#00ce06', fontSize: 24 }} />,
  },
  5: {
    label: 'TakeProfit',
    icon: <DollarOutlined style={{ color: '#00ce06', fontSize: 24 }} />,
  },
  100: {
    label: 'Broken',
    icon: <CloseCircleOutlined style={{ color: '#af2d2d', fontSize: 24 }} />,
  },
};
