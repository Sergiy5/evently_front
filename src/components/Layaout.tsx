import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
