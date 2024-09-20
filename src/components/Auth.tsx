import React, { useEffect, useState } from 'react';
import { RegisterInputEmail } from './RegisterInputEmail';
import { Login } from './Login';
import { RegisterInputPassword } from './RegisterInputPassword';
import { RegisterConirmEmail } from './RegisterConfirmEmail';
import { useAppDispatch } from '@/hooks/hooks';
import { register as registerUser } from '@/redux/auth/operations';
import { IRegisterUser } from '@/types';
import { toast } from 'react-toastify';
import authImg from '../../public/images/auth-img.webp';

interface AuthProps {
  onCloseModal: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onCloseModal }) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    // confirmPassword: '',
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
        const result = await dispatch(registerUser(userData as IRegisterUser));
        console.log(result)

        if (result.payload.status === 'error') throw new Error()
          
          onCloseModal();
        toast.success(`Вітаю! ${result.payload.message}`);

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
      className={` flex flex-row-reverse overflow-hidden bg-lightPurple border-collapse border border-gray rounded-[20px]`}
    >
      <div className={`flex flex-col mt-12 mb-4 mx-[57px]`}>
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
            onCloseModal={handleCloseModal}
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
      </div>
      <img src={authImg} alt="colage_posters" className="w-[415px] h-[650px]" />
    </div>
  );
};
