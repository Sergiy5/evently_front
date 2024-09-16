import { RxCross2 } from 'react-icons/rx';
import { MdDone } from 'react-icons/md';

interface StatusBarPasswordProps {
  text: string;
  valid: boolean;
  sizeIcon?: string;
}
export const SharedItemStatusBarPassword: React.FC<StatusBarPasswordProps> = ({
  text,
  valid,
  sizeIcon
}) => {
  return (
    <div className={`flex flex-row items-center h-4 gap-2`}>
      {valid ? (
        <MdDone className={`w-5 h-5 text-success ${sizeIcon}`} />
      ) : (
        <RxCross2 className={`w-5 h-5 text-error ${sizeIcon}`} />
      )}
      <span className="font-normal w-full text-textDark">{text}</span>
    </div>
  );
};
