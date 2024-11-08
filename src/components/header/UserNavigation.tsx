import { AiOutlineHeart } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { RxCross2 } from 'react-icons/rx';

import { Auth } from '../auth';
import { Modal } from '../ui';
import { IconButton } from '../ui/IconButton';

interface UserNavigationProps {
  toggleInput: () => void;
  isInputVisible: boolean;
  inputRef: React.RefObject<HTMLDivElement>;
  likedEventsCount: number;
  setIsInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleLinkClick: (link: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEmailConfirmed: boolean;
  token: string | null;
}

export const UserNavigation = ({
  toggleInput,
  isInputVisible,
  inputRef,
  likedEventsCount,
  setIsInputVisible,
  handleLinkClick,
  isModalOpen,
  setIsModalOpen,
  isEmailConfirmed,
  token,
}: UserNavigationProps) => {
  return (
    <div className="flex gap-6 pr-12 items-center">
      <button onClick={toggleInput} className="focus:outline-none">
        <BsSearch className="w-[24px] h-[24px] cursor-pointer hover:[color:#9B8FF3]" />
      </button>
      {isInputVisible && (
        <div
          ref={inputRef}
          className="absolute top-[20px] left-[240px] rounded-[20px] w-[1137px] bg-lightPurple flex items-center z-50"
        >
          <div className="flex items-center w-[1162px]  h-[70px] px-4">
            <BsSearch className="w-[24px] h-[24px] mr-2" />
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full p-2 bg-transparent text-gray-600 focus:outline-none"
            />
            <RxCross2
              className="h-[32px] w-[32px] cursor-pointer"
              onClick={() => setIsInputVisible(false)}
            />
          </div>
        </div>
      )}

      <IconButton
        Icon={AiOutlineHeart}
        onClick={() => handleLinkClick('favourite')}
      >
        {likedEventsCount > 0 && (
          <div className="absolute -right-2 -top-2 w-[20px] h-[20px] rounded-full bg-borderColor flex items-center justify-center">
            <span className="text-background text-[10px]">
              {likedEventsCount}
            </span>
          </div>
        )}
      </IconButton>
      <IconButton
        Icon={CgProfile}
        onClick={() => handleLinkClick('user_profile')}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Auth
          onCloseModal={() => setIsModalOpen(false)}
          isEmailConfirmed={isEmailConfirmed}
          resetPasswordByToken={token}
        />
      </Modal>
      <div>UA</div>
    </div>
  );
};
