import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Button from './ui/Button';
import MyEventIcon from '../../public/images/MyEvent-icon.png'

interface HeaderProps {
  // Add any props you need for the header
}

const styles = {
  width: "1320px"
}
// const style = {
  // background: url(new_arrow.png) no-repeat right #ddd;
// }


export const Header: React.FC<HeaderProps> = () => {
  const [selectedCity, setSelectedCity] = useState('Київ');
  const [selectedEvent, setselectedEvent] = useState('Події');

  return (
    <header className="p-4 bg-gray-100">
      <div className="flex justify-center align-beetwen items-center m-auto" style={styles}>
        <a href="/">
          <img src={MyEventIcon} alt="Book My Event" className='h-84px' />
        </a>
      <div className='flex pl-12 pr-24 gap-8'>
        <select
          className='w-21 cursor-pointer'
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          >
          <option value="Події">Події</option>
          <option value="Концерти">Концерти</option>
          <option value="Одеса">Виступи</option>
        </select>
        <nav className="flex p-right-20px gap-8">
          <a href="/">Популярні</a>
          <a href="/">Організаторам</a>
          <a href="/">Про нас</a>
        </nav>
      
        <select
        className='w-21 cursor-pointer'
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
          <BsSearch className='w-6 h-6 cursor-pointer' />
          <FiHeart  className='w-6 h-6 cursor-pointer'/>
          <CgProfile className='w-6 h-6 cursor-pointer'/>
          <select className='cursor-pointer'>
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
