import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { getLikedEvents } from '@/redux/events/selectors';

import { useAppSelector } from '@/hooks/hooks';

import { Container } from '../container/Container';
import { SharedBtn } from '../ui';
import MainLogo from '../ui/Logo';
import { HeaderLines } from './HeaderLines';
import { Navigation } from './Navigation';
import { UserNavigation } from './UserNavigation';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const likedEventsCount = useAppSelector(getLikedEvents).length;

  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (link: string) => {
    if (isLoggedIn) {
      navigate(link);
    } else {
      setIsModalOpen(true);
    }
  };

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
            <div
              onClick={() => navigate('/evently_front')}
              className="cursor-pointer"
            >
              <MainLogo />
            </div>
            <Navigation />
            <UserNavigation
              likedEventsCount={likedEventsCount}
              handleLinkClick={handleLinkClick}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              isEmailConfirmed={isEmailConfirmed}
              token={token}
            />

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
