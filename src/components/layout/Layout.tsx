import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../header/Header';
import { MainLines } from '../main/MainLines';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-[150px]">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <MainLines />
      </main>
      {/* <Footer /> */}
    </>
  );
};
