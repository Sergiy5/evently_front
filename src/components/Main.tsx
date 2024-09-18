import { MainLines } from "./MainLines";

interface MainProps {
  children: React.ReactNode;
  className?: string;
}
export const Main: React.FC<MainProps> = ({ children, className }) => {
  return (
    <main
      className={`relative flex justify-center items-center max-w-[1440px] ${className}`}
    >
      {children}
      <MainLines />
    </main>
  );
};
