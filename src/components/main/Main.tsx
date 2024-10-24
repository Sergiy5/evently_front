import { MainLines } from "./MainLines";

interface MainProps {
  children: React.ReactNode;
  className?: string;
}
export const Main: React.FC<MainProps> = ({ children, className }) => {
  
  return (
    <main
      className='relative'
    >
      <div className={`relative z-20 flex flex-col gap-16 pt-[60px] max-w-[1440px] ${className}`}>{children}</div>
      <MainLines />
    </main>
  );
};
