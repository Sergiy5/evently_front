import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layaout';
import NotFoundPage from './pages/notFoundPage';
const Home = React.lazy(() => import('./pages/home'));
const App = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Layout, {}), children: _jsx(Route, { index: true, element: _jsx(Home, {}) }) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) }), ";"] }));
};
export default App;
