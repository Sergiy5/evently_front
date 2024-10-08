import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// import Button from '../components/ui/Button';
import { Auth } from '../components/auth/Auth';
import { Container } from '../components/container/Container';
import { HeaderLines } from './HeaderLines';
import { Modal, SharedBtn } from '../components/ui';
import { useLocation } from 'react-router';
import CustomSelect from '@/components/ui/CustomSelect';

import { BsSearch } from 'react-icons/bs';
import { AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from 'react-icons/cg';
import MainLogo from '../components/ui/Logo'

import { eventOptions } from '@/utils/statickData';
import { cityOptions } from '@/utils/statickData';
import { laguageOptions } from '@/utils/statickData';

interface HeaderProps {
  // Add any props you need for the header
}



export const Header: React.FC<HeaderProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const toggleInput = () => {
    setIsInputVisible(!isInputVisible);
  };

  // Closing input when klick in not on input
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
      setIsModalOpen(true); // Open login modal after email confirmation
    }
  }, [location]);

  // Function to toggle modal
  const handleTogleModal = () => {
    // Slow close modal
    setIsModalOpen(!isModalOpen);
  };

  //header link change color
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className={`block m-auto max-w-[1440px] font-lato bg-background`}>
      <Container className="relative">
        <HeaderLines />
        <header className="p-4 bg-gray-100">
          <div className="leading-[19.2px] flex justify-center align-beetwen items-center m-auto max-w-[1440px] h-[84px]">
            <Link className='background-background' to='/evently_front'>
              <MainLogo/>
            </Link>
            <div className="flex pl-12 pr-24 gap-8 items-center">
              <CustomSelect  
                  changeLink={handleLinkClick}
                  options={eventOptions}
                  label='Події'
                  replaceLabelOnSelect={false}
                  dropdownWidth="175px"
                  buttonWidth="62px" 
                  />
              <nav className="flex p-right-20px gap-8">
                <Link 
                to="/evently_front/popular" 
                onClick={() => handleLinkClick('popular')}
                className={`${
                  activeLink === 'popular' ? 'text-purple-600' : 'text-gray-700'
                  } hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)]`}>
                    Популярні
                </Link>
                <Link 
                to="/evently_front/organizers" 
                onClick={() => handleLinkClick('organizers')}
                className={`${
                  activeLink === 'organizers' ? 'text-purple-600' : 'text-gray-700'
                  } hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)]`}>
                    Організаторам
                </Link>
                <Link 
                to="/evently_front/about" 
                onClick={() => handleLinkClick('about')}
                className={`${
                  activeLink === 'about' ? 'text-purple-600' : 'text-gray-700'
                  } hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)]`}>
                    Про нас
                </Link>
              </nav>
              <CustomSelect  
                  options={cityOptions}
                  label='Київ'
                  replaceLabelOnSelect={true}
                  dropdownWidth="168px"
                  buttonWidth="62px" />
            </div>
            <div className="flex gap-6 pr-12 items-center">
            <button onClick={toggleInput} className="focus:outline-none">
              <BsSearch className="w-[24px] h-[24px] cursor-pointer hover:[color:#9B8FF3]" />
            </button>
              {isInputVisible && (
                <div
                  ref={inputRef}
                  className="absolute top-[20px] left-[220px] rounded-[20px] w-[1162px] bg-lightPurple flex items-center z-50"
                >
                  <div className="flex items-center w-[1162px] max-w-3xl h-[70px] px-4">
                    <BsSearch className="w-5 h-5 mr-2" />
                    <input
                      type="text"
                      placeholder="Поиск..."
                      className="w-full p-2 bg-transparent text-gray-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}
              <AiOutlineHeart className="w-[24px] h-[24px] cursor-pointer hover:[color:#9B8FF3]" />
              <button onClick={handleTogleModal}>
                <CgProfile className="w-[24px] h-[24px] cursor-pointer hover:[color:#9B8FF3]" />
              </button>
              <Modal isOpen={isModalOpen} onClose={handleTogleModal}>
                <Auth
                  onCloseModal={handleTogleModal}
                  isEmailConfirmed={isEmailConfirmed}
                />
              </Modal>
              <CustomSelect  
                  options={laguageOptions}
                  label='UA'
                  replaceLabelOnSelect={true}
                  dropdownWidth="60px"
                  buttonWidth="54px" />
            </div>
            <Link to='events'>
              <SharedBtn 
              type="button"
              primary
              className={`w-[230px] mx-auto`}
              >Створити подію</SharedBtn>
            </Link>
          </div>
        </header>
      </Container>
    </div>
  );
};
