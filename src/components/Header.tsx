import React, { useState } from 'react';
import { Modal } from './ui';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';
// import { Register } from './Register';

interface HeaderProps {
  // Add any props you need for the header
}

export const Header: React.FC<HeaderProps> = () => {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  const registerUser = () => {
    setRegister(!register);
  };
  const loginUser = () => {
    setLogin(true);
  };
  const handleToggleModal = () => {
    setRegister(false);
    setLogin(false);
  };
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Evently</h1>
      <button
        id="register"
        className="bg-blue-500 hover:bg-blue-700 focus:outline-none text-white font-bold py-2 px-4 rounded"
        onClick={registerUser}
      >
        Register
      </button>
      <button
        id="login"
        className="bg-blue-500 hover:bg-blue-700 focus:outline-none text-white font-bold py-2 px-4 rounded"
        onClick={loginUser}
      >
        LogIn
      </button>
      <Modal isOpen={login} onClose={handleToggleModal}>
        <LoginForm onCloseModal={handleToggleModal} />
      </Modal>
      <Modal isOpen={register} onClose={handleToggleModal}>
        <RegisterForm onCloseModal={handleToggleModal} />
      </Modal>
    </header>
  );
};
