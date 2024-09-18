interface MainProps {
  children: React.ReactNode;
  className?: string;
}
export const Main: React.FC<MainProps> = ({children, className}) => {
    return <main className={`flex justify-center items-center max-w-[1440px] ${className}`}>{ children }</main>;
};