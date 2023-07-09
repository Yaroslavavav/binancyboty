import React from 'react';
import { MobXProviderContext } from 'mobx-react';

import type { Stores } from './index';

export const useStores = () =>
  React.useContext<Stores>(MobXProviderContext as any);
