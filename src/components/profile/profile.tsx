import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Імпорт попапу для логінізації
import { selectIsLoggedIn } from '@/redux/auth/selectors';

import { Auth } from '../auth/Auth';
import { Modal } from '../ui/Modal';
import Information from './Information';

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsModalOpen(true); // Відкриваємо попап, якщо незалогований
    }
  }, [isLoggedIn]);
  // Function to toggle modal
  const handleTogleModal = () => {
    // Slow close modal
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('emailConfirmed') === 'true') {
      setIsEmailConfirmed(true);
      setIsModalOpen(true); // Open login modal after email confirmation
    }
  }, [location]);

  return (
    <div>
      {isLoggedIn ? (
        <Information />
      ) : (
        <Modal isOpen={isModalOpen} onClose={handleTogleModal}>
          <Auth
            onCloseModal={handleTogleModal}
            isEmailConfirmed={isEmailConfirmed}
          />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
