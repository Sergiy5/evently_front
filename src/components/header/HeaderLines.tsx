import { nanoid } from '@reduxjs/toolkit';

export const HeaderLines: React.FC = () => {
  return (
    <>
      <div
        key={nanoid()}
        className={`absolute w-[1px] bg-lightPurple left-5 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute w-[1px] bg-lightPurple left-10 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute w-[1px] bg-lightPurple right-5 h-full`}
      ></div>
      <div
        key={nanoid()}
        className={`absolute w-[1px] bg-lightPurple right-10 h-full`}
      ></div>
    </>
  );
};
