import React, { useEffect, useState } from 'react';
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

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('emailConfirmed') === 'true') {
      setIsEmailConfirmed(true);
      setIsModalOpen(true); // Open login modal after email confirmation
    }
  }, [location]);


  // // Функция для открытия модального окна
  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // // Функция для закрытия модального окна
  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // Function to toggle modal
  const handleTogleModal = () => {
    // Slow close modal
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={`block m-auto max-w-[1440px] font-lato`}>
      <Container className="relative">
        <HeaderLines />
        <header className="p-4 bg-gray-100">
          <div className="leading-[19.2px] flex justify-center align-beetwen items-center m-auto max-w-[1440px] h-[84px]">
            <a href="/">
              <MainLogo/>
            </a>
            <div className="flex pl-12 pr-24 gap-8 items-center">
              <CustomSelect  
                  options={eventOptions}
                  label='Події'
                  replaceLabelOnSelect={false}
                  dropdownWidth="166px"
                  buttonWidth="62px" 
                  />
              <nav className="flex p-right-20px gap-8">
                <Link to="/evently_front/popular" className="hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)]">
                    Популярні
                </Link>
                <Link to="/evently_front/organizers" className="hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)]">
                    Організаторам
                </Link>
                <Link to="/evently_front/about" className="hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)]">
                    Про нас
                </Link>
              </nav>
              <CustomSelect  
                  options={cityOptions}
                  label='Київ'
                  replaceLabelOnSelect={true}
                  dropdownWidth="166px"
                  buttonWidth="62px" />
            </div>
            <div className="flex gap-6 pr-12 items-center">
              <BsSearch className="w-[24px] h-[24px] cursor-pointer hover:[color:#9B8FF3]" />
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
