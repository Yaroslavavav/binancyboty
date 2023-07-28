import React from 'react';
import { Empty, Space, Spin, Typography } from 'antd';
// impor
import { Link } from 'react-router-dom';
import classes from './style.module.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const Layout: React.FC<{
  children: React.ReactNode;
  title?: string | React.ReactNode;
  backArrow?: boolean;
  loading?: boolean;
  empty?: boolean;
}> = ({
  children,
  title = '',
  backArrow = false,
  loading = false,
  empty = false,
}) => {
  if (loading) {
    return (
      <main className={classes.main}>
        <Spin style={{ width: '100%', margin: '0 auto' }} />
      </main>
    );
  }
  if (empty) {
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
        <Empty style={{ width: '100%', margin: '0 auto' }} />
      </main>
    );
  }

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
