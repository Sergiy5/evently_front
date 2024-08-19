interface AuthProps {
  children: React.ReactNode;
}
export const Auth: React.FC<AuthProps> = ({ children }) => {
  return <>{children}</>;
};