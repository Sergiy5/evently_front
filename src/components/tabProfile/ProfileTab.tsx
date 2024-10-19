import { useEffect, useState } from 'react';
import { redirect, useLocation, useNavigate } from 'react-router-dom';

import { AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GrUserAdmin } from 'react-icons/gr';
import { HiOutlineUsers } from 'react-icons/hi';
import {
  IoExitOutline,
  IoNotificationsOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import ItemTab from './ItemTab';
import { TbCalendarEvent } from 'react-icons/tb';
import { PiFlowerLotusLight } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

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
  const navigate = useNavigate();
  const { t } = useTranslation('tabProfile');
  const tabs = t('tabs', { returnObjects: true }); // повертає масив

  useEffect(() => {
    if (pathname.includes('admin')) {
      setIsActiveAdmin(true);
    }
  }, []);

  const handleOpenAdminTab = () => {
    setIsActiveAdmin(prev => !prev);
  };

  const handleLogout = () => {
    navigate('');
  };

  return (
    <nav className="w-[290px] min-h-[989px] h-full bg-lightPurple rounded-[20px] px-1">
      <ul>
        {tabUser.map((item, index) => (
          <ItemTab
            item={item}
            openTab={handleOpenAdminTab}
            isOpen={isActiveAdmin}
            title={tabs[index]}
          />
        ))}
        {isActiveAdmin && (
          <>
            {tabAdmin.map((item, index) => (
              <ItemTab title={tabs[index + 4]} item={item} openTab={() => {}} />
            ))}
          </>
        )}
      </ul>
      <button
        onClick={handleLogout}
        className={clsx(
          'w-full pt-[11px] pb-[10px] pl-7 flex gap-2 text-start text-textDark text-[24px] leading-6 rounded-[15px] border border-transparent ' +
            'hover:border-buttonPurple hover:outline-0 ' +
            'active:bg-buttonPurple active:text-white '
        )}
      >
        <IoExitOutline className="w-6 h-6" />
        {t('logout')}
      </button>
    </nav>
  );
};

export default ProfileTab;
