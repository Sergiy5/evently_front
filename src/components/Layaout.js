import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
const Layout = () => {
    return (_jsx(_Fragment, { children: _jsx("main", { children: _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(Outlet, {}) }) }) }));
};
export default Layout;
