import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { MainLines } from '../main/MainLines';
import ProfileTab from '../tabProfile/ProfileTab';

export const ProfileTabLayout = () => {
  return (
    <main className="flex gap-[25px] relative p-[72px_55px] ">
      <MainLines />
      <ProfileTab />

      <section className="rounded-[20px] bg-lightPurple py-4 px-[16px] w-full h-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
};
