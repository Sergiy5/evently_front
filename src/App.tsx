import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layaout';
import Home from './pages/Home';

const NotFound = React.lazy(() => import('./pages/NotFoundPage'));
// const Home = React.lazy(() => import('./pages/Home'));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="/..." element={...} />
      <Route path="/..." element={...} /> */}
        <Route path="*" element={<NotFound />} />;
      </Route>
    </Routes>
  );
};

export default App;
