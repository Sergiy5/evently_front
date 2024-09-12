import React, { useEffect, useState } from 'react';
import { RegisterInputEmail } from './RegisterInputEmail';
import { Login } from './Login';
import { RegisterInputPassword } from './RegisterInputPassword';
import { RegisterConirmEmail } from './RegisterConfirmEmail';
import { useAppDispatch } from '@/hooks/hooks';
import { register as registerUser } from '@/redux/auth/operations';
import { RegisterUserInterface } from '@/types';
import { toast } from 'react-toastify';
import authImg from '../../public/images/auth-form.webp';

interface AuthProps {
  onCloseModal: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onCloseModal }) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [statusAuth, setStatusAuth] = useState<
    'login' | 'register_email' | 'register_password' | 'confirm_email'
  >('login');

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    onCloseModal();
  };
  const handleStatusAuth = (
    status: 'login' | 'register_email' | 'register_password' | 'confirm_email'
  ) => {
    setStatusAuth(status);
  };
  useEffect(() => {
    if (!userData.email || !userData.password || !userData.name) return;

    const onRegisterUser = async () => {
      try {
        const result = await dispatch(
          registerUser(userData as RegisterUserInterface)
        );
        toast.success('Welcome!');
        console.log('REGISTER_RESULT_IN_AUTH_>>>>>>>>', result);
      
      } catch (error) {
        toast.error('You are not registered!');
        console.error(error);
      } finally {
      }
    };
    onRegisterUser();
  }, [userData.password]);

  return (
    <div
      className={` flex gap-12 flex-row-reverse overflow-hidden bg-lightPurple border-collapse border border-gray rounded-[20px]`}
    >
      {statusAuth === 'login' && (
        <Login
          onCloseModal={handleCloseModal}
          setStatusAuth={handleStatusAuth}
        />
      )}
      {statusAuth === 'register_email' && (
        <RegisterInputEmail
          setUserData={setUserData}
          email={userData.email}
          setStatusAuth={handleStatusAuth}
        />
      )}
      {statusAuth === 'register_password' && (
        <RegisterInputPassword
          setUserData={setUserData}
          setStatusAuth={handleStatusAuth}
          name={userData.name}
        />
      )}
      {statusAuth === 'confirm_email' && (
        <RegisterConirmEmail setStatusAuth={handleStatusAuth} />
      )}
      {/* {isLoading && <div>LOADING...</div>} */}
      <img src={authImg} alt="colage_posters" />
    </div>
  );
};
