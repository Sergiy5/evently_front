import React, { useState } from 'react';
import { RegisterInputEmail } from './RegisterInputEmail';
import { Login } from './Login';
import { RegisterInputPassword } from './RegisterInputPassword';

interface AuthProps {
  onCloseModal: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onCloseModal }) => {
    // const [isLoading, setIsLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');
  const [statusAuth, setStatusAuth] = useState<
    'login' | 'register' | 'register_password'
  >('login');

  const handleToggleModal = () => {
    onCloseModal();
  };
  const handleStatusAuth = (
    status: 'login' | 'register' | 'register_password'
  ) => {
    setStatusAuth(status);
  };

  return (
    <div
      className={` flex gap-12 flex-row-reverse overflow-hidden bg-lightPurple border-collapse border border-borderColor rounded-[20px]`}
    >
      {statusAuth === 'login' && (
        <Login
          onCloseModal={handleToggleModal}
          setStatusAuth={handleStatusAuth}
        />
      )}
      {statusAuth === 'register' && (
        <RegisterInputEmail
          handleUserEmail={setUserEmail}
          setStatusAuth={handleStatusAuth}
        />
      )}
      {statusAuth === 'register_password' && (
        <RegisterInputPassword
          onCloseModal={handleToggleModal}
          email={userEmail}
        />
      )}
      <img src="public/images/auth-form.webp" alt="colage_posters" />
      {/* {isLoading && <div>LOADING...</div>} */}
    </div>
  );
};
