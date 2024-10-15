import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Auth } from '../auth/Auth'; // Імпорт попапу для логінізації
import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { Modal } from '../ui/Modal';

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
            <h1 className="text-2xl">Профіль</h1>
            {isLoggedIn ? (
                <div>Вітаємо у вашому профілі!</div>
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