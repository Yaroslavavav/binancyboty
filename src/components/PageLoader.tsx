import React from 'react';
import { Spin } from 'antd';

import classes from './style.module.scss';

const PageLoader: React.FC = () => (
  <div className={classes.pageLoader}>
    <Spin size="large" />
  </div>
);

export default PageLoader;
