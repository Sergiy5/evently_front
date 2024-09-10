import React, { useState } from 'react';
import { Register } from './Register';
import { Login } from './Login';

interface AuthProps {
 
  onCloseModal: () => void;

}

export const Auth: React.FC<AuthProps> = ({ onCloseModal}) => {
  const [statusAuth, setStatusAuth] = useState<
    'login' | 'register' | 'register_password'
  >('login');
    const [isLoading, setIsLoading] = useState(false);



    const handleToggleModal = () => {
      onCloseModal();
    };
    
  return (
    <div
      className={` flex gap-12 flex-row-reverse overflow-hidden bg-formBgColor border-collapse border border-borderColor rounded-[20px]`}
    >
      {statusAuth === 'login' && <Login onCloseModal={handleToggleModal} />}
      {statusAuth === 'register' && (
        <Register onCloseModal={handleToggleModal} />
      )}
      {statusAuth === 'register_password' && <div />}
      <img src="public/images/auth-form.webp" alt="colage_posters" />
      {isLoading && <div>LOADING...</div>}
    </div>
  );
};
