import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GrUserAdmin } from 'react-icons/gr';
import { HiOutlineUsers } from 'react-icons/hi';
import { IoNotificationsOutline, IoTicketOutline } from 'react-icons/io5';

import ItemTab from './ItemTab';
import { TbCalendarEvent } from 'react-icons/tb';
import { PiFlowerLotusLight } from 'react-icons/pi';

const tabUser = [
  {
    title: 'Мій профіль',
    icon: <CgProfile className="w-6 h-6" />,
    url: 'user_profile',
  },
  {
    title: 'Збережені',
    icon: <AiOutlineHeart className="w-6 h-6" />,
    url: 'favourite',
  },
  {
    title: 'Мої події',
    icon: <IoTicketOutline className="w-6 h-6" />,
    url: 'my-event',
  },
  {
    title: 'Адміністрування',
    icon: <GrUserAdmin className="w-6 h-6" />,
    url: 'admin/users',
  },
];

const tabAdmin = [
  {
    title: 'Користувачі',
    icon: <HiOutlineUsers className="w-6 h-6" />,
    url: 'admin/users',
  },
  {
    title: 'Події',
    icon: <TbCalendarEvent className="w-6 h-6" />,
    url: 'admin/events',
  },
  {
    title: 'Промо події',
    icon: <PiFlowerLotusLight className="w-6 h-6" />,
    url: 'admin/promo-events',
  },
  {
    title: 'Сповіщення',
    icon: <IoNotificationsOutline className="w-6 h-6" />,
    url: 'admin/notifications',
  },
];

const ProfileTab = () => {
  const [isActiveAdmin, setIsActiveAdmin] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('admin')) {
      setIsActiveAdmin(true);
    }
  }, []);

  const handleOpenAdminTab = () => {
    setIsActiveAdmin(prev => !prev);
  };

  return (
    <nav className="w-[290px] min-h-[989px] h-full bg-lightPurple rounded-[20px]">
      <ul>
        {tabUser.map(item => (
          <ItemTab
            item={item}
            openTab={handleOpenAdminTab}
            isOpen={isActiveAdmin}
          />
        ))}
        {isActiveAdmin && (
          <>
            {tabAdmin.map(item => (
              <ItemTab item={item} openTab={() => {}} />
            ))}
          </>
        )}
      </ul>
    </nav>
  );
};

export default ProfileTab;
