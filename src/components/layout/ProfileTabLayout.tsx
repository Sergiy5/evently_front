import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import ProfileTab from '../tabProfile/ProfileTab';
import { MainLines } from '../main/MainLines';

export const ProfileTabLayout = () => {
  return (
    <main className="flex gap-[25px] relative p-[72px_79px]">
      <MainLines />
      <ProfileTab />

      <section >
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
};
