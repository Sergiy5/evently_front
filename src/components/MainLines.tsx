import { nanoid } from '@reduxjs/toolkit';

export const MainLines: React.FC = () => {
  return (
    <div className={`absolute w-full h-full`}>
      <div key={nanoid()} className={`absolute h-[1px] bg-black top-0 w-full`}></div>
      <div key={nanoid()} className={`absolute h-[1px] bg-black top-5 w-full`}></div>
      <div key={nanoid()} className={`absolute w-[1px] bg-black left-5 h-full`}></div>
      <div key={nanoid()} className={`absolute w-[1px] bg-black left-10 h-full`}></div>
      <div key={nanoid()} className={`absolute w-[1px] bg-black right-5 h-full`}></div>
      <div key={nanoid()} className={`absolute w-[1px] bg-black right-10 h-full`}></div>
    </div>
  );
};
