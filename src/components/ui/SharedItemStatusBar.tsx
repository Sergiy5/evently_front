import { MdDone } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

interface StatusBarProps {
  text: string | boolean;
  valid: boolean;
  sizeIcon?: string;
  className?: string;
}
export const SharedItemStatusBar: React.FC<StatusBarProps> = ({
  text,
  valid,
  sizeIcon,
  className,
}) => {
  return (
    <div
      className={`flex flex-row text-xs items-center h-4 gap-2 ${className}`}
    >
      {valid ? (
        <MdDone className={`w-5 h-5 text-success ${sizeIcon}`} />
      ) : (
        <RxCross2 className={`w-5 h-5 text-error ${sizeIcon}`} />
      )}
      <span className="font-normal w-full text-textDark">{text}</span>
    </div>
  );
};
