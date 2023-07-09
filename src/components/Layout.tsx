import React from 'react';
import { Space, Typography } from 'antd';
// impor
import { Link } from 'react-router-dom';
import classes from './style.module.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const Layout: React.FC<{
  children: React.ReactNode;
  title?: string;
  backArrow?: boolean;
}> = ({ children, title = '', backArrow = false }) => {
  return (
    <main className={classes.main}>
      {backArrow && (
        <Link to="/">
          <Space>
            <ArrowLeftOutlined />
            Back
          </Space>
        </Link>
      )}
      <Title className={classes.header__title}>{title}</Title>
      {children}
    </main>
  );
};
