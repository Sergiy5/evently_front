import ScrollUp from '../allEvents/ScrollUp';

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export const Main: React.FC<MainProps> = ({ children, className }) => {
  return (
    <main className="relative">
      <div
        className={`relative z-0 flex flex-col gap-16 pt-[34px] max-w-full ${className}`}
      >
        {children}
      </div>
      <ScrollUp />
    </main>
  );
};
