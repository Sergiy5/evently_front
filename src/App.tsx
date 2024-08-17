import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layaout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="/" element={} />
      <Route path="/" element={} /> */}
      </Route>
    </Routes>
  );
};

export default App;
