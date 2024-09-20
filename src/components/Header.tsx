import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Button from './ui/Button';
import MyEventIcon from '../../public/images/MyEvent-icon.png'
import { Auth } from './Auth';

interface HeaderProps {
  // Add any props you need for the header
}


export const Header: React.FC<HeaderProps> = () => {

  const [selectedCity, setSelectedCity] = useState('Київ');
  const [selectedEvent, setselectedEvent] = useState('Події');

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Функция для открытия модального окна
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="p-4 bg-gray-100">
      <div className=" flex justify-center align-beetwen items-center m-auto max-w-[1440px] h-[84px]" >
        {/* <HeaderLines /> */}
        <a href="/">
          <img src={MyEventIcon} alt="Book My Event" className='h-[84px]' />
        </a>
      <div className='flex pl-12 pr-24 gap-8'>
        <select
          className='w-21 cursor-pointer hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)] z-10'
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          >
          <option value="Події">Події</option>
          <option value="Концерти">Концерти</option>
          <option value="Одеса">Виступи</option>
        </select>
        <nav className="flex p-right-20px gap-8">
          <a href="/" className='hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)] z-10'>Популярні</a>
          <a href="/" className='hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)] z-10'>Організаторам</a>
          <a href="/" className='hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)] z-10'>Про нас</a>
        </nav>
      
        <select
        className='w-21 cursor-pointer hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)] z-10'
          value={selectedEvent}
          onChange={e => setselectedEvent(e.target.value)}
        >
          <option value="Київ">Київ</option>
          <option value="Львів">Львів</option>
          <option value="Одеса">Одеса</option>
          <option value="Харків">Харків</option>
        </select>
      </div>  
        <div className='flex gap-6 pr-12'>
          <BsSearch className='w-6 h-6 cursor-pointer z-10' />
          <FiHeart  className='w-6 h-6 cursor-pointer z-10'/>
          <button onClick={handleOpenModal} className='z-10'>
            <CgProfile className='w-6 h-6 cursor-pointer ' />
          </button>
          {isModalOpen && <Auth onCloseModal={handleCloseModal} />}
          <select className='cursor-pointer hover:[text-shadow:_0_0_.65px_rgb(0_0_0_/_1)] z-10'>
            <option value="UA">UA</option>
            <option value="EN">EN</option>
          </select>
        </div>
        <Button type="button">
          Створити подію
        </Button>
      </div>
    </header>
  );
};
