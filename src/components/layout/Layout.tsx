import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Header } from '../header/Header';

export const Layout = () => {
  
  return (
    <>
      <Header />
      <main className='pt-[115px]'>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      {/* <Footer /> */}
    </>
  );
};


