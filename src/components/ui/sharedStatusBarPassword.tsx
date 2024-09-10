import { RxCross2 } from "react-icons/rx"

interface StatusBarPasswordProps {
  text: string;
  valid: boolean;
}
export const SharedStatusBarPassword: React.FC<StatusBarPasswordProps> = ({ text, valid }) => {
  return (
    <div className={`flex items-center gap-2`}>
      {valid ? <RxCross2 className="w-4 h-4" />: <div>Y</div>}
      <span>{text}</span>
    </div>
  );
};