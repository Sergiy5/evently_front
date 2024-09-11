import { RxCross2 } from 'react-icons/rx';
import { MdDone } from 'react-icons/md';

interface StatusBarPasswordProps {
  text: string;
  valid: boolean;
}
export const SharedItemStatusBarPassword: React.FC<StatusBarPasswordProps> = ({
  text,
  valid,
}) => {
  return (
    <div className={`flex items-center  gap-2`}>
      {valid ? (
        <MdDone className="w-4 h-4 text-success" />
      ) : (
        <RxCross2 className="w-4 h-4 text-error" />
      )}
      <span className="font-normal text-xs text-textDark">{text}</span>
    </div>
  );
};
