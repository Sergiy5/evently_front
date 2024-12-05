import { NavLink } from 'react-router-dom';

import { cityOptions, eventTypes } from '@/assets/staticData/statickData';

import CustomSelect from '../ui/CustomSelect';

export const Navigation: React.FC = () => {
  return (
    <div className="flex pl-12 pr-24 gap-8 items-center">
      <CustomSelect
        options={eventTypes}
        label="Події"
        replaceLabelOnSelect={false}
        className="hover:font-bold"
        dropdownWidth="178px"
        buttonWidth="62px"
      />
      <nav className="flex gap-8">
        <NavLink
          to="/popular"
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
          to="/organizers"
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
          to="/about"
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
  );
};
