import React, { Suspense } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageLoader from './components/PageLoader';
const HomePage = React.lazy(() => import('./pages/Home'));
const AgentPage = React.lazy(() => import('./pages/Agent'));
const RegistrationPage = React.lazy(() => import('./pages/Registration'));
const LoginPage = React.lazy(() => import('./pages/Login'));
// import styles from './index.module.scss'; // Import SCSS module styles

const testAgent = {
  investment: 42,
  updatesPerInterval: 421,
  setId: {
    symbol: 'SOLUSDT',
    interval: 3,
  },
  takeProfit: 0.4,
  stopLoss: 0.1,
  methodConfig: {
    MethodName: 'macd-rsi',
    MethodConfigProperties: {
      Properties: {
        MinGrowthIntervals: 2.6,
        MacdSignalScale: 1.8,
        MinRsiModification: 1.9,
        MaxRsiModification: 2.5,
        SignalThreshold: 0.6,
      },
    },
  },
};

const App = observer(() => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<AgentPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
});

function NotFound() {
  return <h1>404 Not Found</h1>;
}

export default App;
