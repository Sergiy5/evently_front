import React, { useState } from 'react';
import { Modal } from './ui';
import { Auth } from './Auth';

interface HeaderProps {
  // Add any props you need for the header
}

export const Header: React.FC<HeaderProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Evently</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 focus:outline-none text-white font-bold py-2 px-4 rounded"
        onClick={handleToggleModal}
      >
        Login
      </button>
      <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
        <Auth onCloseModal={handleToggleModal} />
      </Modal>
    </header>
  );
};
