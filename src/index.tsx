import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'mobx-react';

import { Stores } from './store';
import auth from './store/auth';
import agentsStore from './store/agents';
import App from './App';

import './style.scss';

const stores: Stores = {
  auth,
  agentsStore,
};

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <Provider {...stores}>
    <App />
  </Provider>
);
