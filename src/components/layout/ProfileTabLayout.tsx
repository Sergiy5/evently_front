import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import ProfileTab from '../tabProfile/ProfileTab';
import { MainLines } from '../main/MainLines';

export const ProfileTabLayout = () => {
  return (
    <main className="flex gap-[25px] relative p-[72px_79px] ">
      <MainLines />
      <ProfileTab />

      <section className="rounded-[20px] bg-lightPurple py-4 px-8 w-full h-max">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
};
