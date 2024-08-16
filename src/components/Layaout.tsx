import { Outlet } from "react-router-dom";
import { Suspense } from "react";


const Layout = () => {
  return (
    <>
      {/* <Header /> */}
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
