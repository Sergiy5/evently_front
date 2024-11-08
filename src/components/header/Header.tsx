import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { RxCross2 } from 'react-icons/rx';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { getLikedEvents } from '@/redux/events/selectors';

import { useAppSelector } from '@/hooks/hooks';
import { cityOptions, eventOptions } from '@/utils/statickData';

import CustomSelect from '@/components/ui/CustomSelect';

import { Auth } from '../auth/Auth';
import { Container } from '../container/Container';
import { Modal, SharedBtn } from '../ui';
import MainLogo from '../ui/Logo';
import { HeaderLines } from './HeaderLines';

interface iHeaderProps {}

export const Header: React.FC<iHeaderProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const inputRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const likedEventsCount = (useAppSelector(getLikedEvents) as any[]).length;

  const navigate = useNavigate();
  const location = useLocation();

  const toggleInput = () => setIsInputVisible(!isInputVisible);

  const handleLinkClick = (link: string) => {
    if (isLoggedIn) {
      navigate(link);
    } else {
      setIsModalOpen(true);
    }
  };
  // Closing input when klick is not on it
  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsInputVisible(false);
    }
  };

  useEffect(() => {
    if (isInputVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInputVisible]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('emailConfirmed') === 'true') {
      setIsEmailConfirmed(true);
      setIsModalOpen(true);
    }
    if (params.get('token')) {
      setToken(params.get('token'));
      setIsModalOpen(true);
    }
    return () => setToken(null);
  }, [location]);

  return (
    <div className="block m-auto max-w-[1440px] font-lato bg-background">
      <Container className="relative">
        <HeaderLines />
        <header className="p-4 bg-gray-100">
          <div className="flex justify-center items-center h-[84px]">
            {/* Logo */}
            <div
              onClick={() => navigate('/evently_front')}
              className="cursor-pointer"
            >
              <MainLogo />
            </div>

            {/* Navigation Links */}
            <div className="flex pl-12 pr-24 gap-8 items-center">
              <CustomSelect
                options={eventOptions}
                label="Події"
                replaceLabelOnSelect={false}
                className="hover:font-bold"
                dropdownWidth="178px"
                buttonWidth="62px"
              />
              <nav className="flex gap-8">
                <NavLink
                  to="/evently_front/popular"
                  className={({ isActive }) =>
                    `w-[82px] ${
                      isActive
                        ? 'text-buttonPurple font-bold hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_0.5)]'
                        : 'text-gray-700 hover:font-bold'
                    }`
                  }
                >
                  Популярні
                </NavLink>
                <NavLink
                  to="/evently_front/organizers"
                  className={({ isActive }) =>
                    `w-[110px] ${
                      isActive
                        ? 'text-buttonPurple font-bold hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_0.5)]'
                        : 'text-gray-700 hover:font-bold'
                    }`
                  }
                >
                  Організаторам
                </NavLink>
                <NavLink
                  to="/evently_front/about"
                  className={({ isActive }) =>
                    `w-[63px] ${
                      isActive
                        ? 'text-buttonPurple font-bold hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_0.5)]'
                        : 'text-gray-700 hover:font-bold'
                    }`
                  }
                >
                  Про нас
                </NavLink>
              </nav>
              <CustomSelect
                options={cityOptions}
                label="Київ"
                replaceLabelOnSelect
                className="w-[94px] hover:font-bold"
                dropdownWidth="168px"
                buttonWidth="62px"
              />
            </div>

            {/* Search, Favourites, and Profile */}
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
              <NavLink
                to="/evently_front/favourite"
                className="relative cursor-pointer "
              >
                <AiOutlineHeart className="w-[24px] h-[24px] hover:[color:#9B8FF3]" />
                {likedEventsCount > 0 && (
                  <div className="absolute -right-2 -top-2 w-[20px] h-[20px] rounded-full bg-borderColor flex items-center justify-center">
                    <span className="text-background text-[10px]">
                      {likedEventsCount}
                    </span>
                  </div>
                )}
              </NavLink>
              <button onClick={() => handleLinkClick('user_profile')}>
                <CgProfile className="w-[24px] h-[24px] cursor-pointer hover:[color:#9B8FF3]" />
              </button>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Auth
                  onCloseModal={() => setIsModalOpen(false)}
                  isEmailConfirmed={isEmailConfirmed}
                  resetPasswordByToken={token}
                />
              </Modal>
              <div>UA</div>
            </div>
            <div onClick={() => handleLinkClick('events')}>
              <SharedBtn
                type="button"
                primary
                className="w-[230px] mx-auto h-12"
              >
                Створити подію
              </SharedBtn>
            </div>
          </div>
        </header>
      </Container>
    </div>
  );
};
