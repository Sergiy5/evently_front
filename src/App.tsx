import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layaout';

const Home = React.lazy(() => import('./pages/Home'));
const NotFoundPage = React.lazy(() => import('./pages/notFoundPage'));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="/..." element={...} />
      <Route path="/..." element={...} /> */}
        <Route path="*" element={<NotFoundPage />} />;
      </Route>
    </Routes>
  );
};

export default App;
