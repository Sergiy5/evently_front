import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center gap-4", children: [_jsx("h1", { children: "Page Not Found" }), _jsx("p", { children: "The page you are looking for does not exist." }), _jsx(Link, { to: "/", className: " bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ", children: "Go Home..." })] }));
};
export default NotFoundPage;
