import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/hooks';
import { register as registerUser } from '@/redux/auth/operations';
import { IRegisterUser } from '@/types';
import { toast } from 'react-toastify';
import authImg from '../../../public/images/auth-img.webp';
import { Login } from './Login';
import { RegisterInputEmail } from './RegisterInputEmail';
import { RegisterInputPassword } from './RegisterInputPassword';
import { RegisterConfirmEmail } from './RegisterConfirmEmail';
import { PasswordRenovation } from './PasswordRenovation';
import { PasswordRenovationInputPassword } from './PasswordRenovationInputPassword';

interface AuthProps {
  onCloseModal: () => void;
  isEmailConfirmed: boolean;
  resetPasswordByToken: string | null;
}

export const Auth: React.FC<AuthProps> = ({
  onCloseModal,
  isEmailConfirmed,
  resetPasswordByToken,
}) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [statusAuth, setStatusAuth] = useState<
    | 'login'
    | 'register_email'
    | 'register_password'
    | 'confirm_email'
    | 'password_renovation'
    | 'password_renovation_on_input'
  >('login');

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    onCloseModal();
  };
  const handleStatusAuth = (
    status:
      | 'login'
      | 'register_email'
      | 'register_password'
      | 'confirm_email'
      | 'password_renovation'
      | 'password_renovation_on_input'
  ) => {
    setStatusAuth(status);
  };

  useEffect(() => {
    if (isEmailConfirmed) {
      setStatusAuth('login');
    }
    if(resetPasswordByToken) {
      setStatusAuth('password_renovation_on_input');
    }
  }, [isEmailConfirmed, resetPasswordByToken]);

  useEffect(() => {
    if (!userData.email || !userData.password || !userData.name) return;

    const onRegisterUser = async () => {
      try {
        const result = await dispatch(registerUser(userData as IRegisterUser));

        console.log('RESULT_REGISTER_>>>', result);

        if (result.payload.status === 'error') throw new Error();

        toast.success(`Вітаю! ${result.meta.arg.name}`);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
    onRegisterUser();
  }, [userData.email, userData.password, userData.name]);

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
          <RegisterConfirmEmail setStatusAuth={handleStatusAuth} />
        )}
        {statusAuth === 'password_renovation' && (
          <PasswordRenovation onCloseModal={handleCloseModal} />
        )}
        {statusAuth === 'password_renovation_on_input' && (
          <PasswordRenovationInputPassword
            onCloseModal={handleCloseModal}
            token={resetPasswordByToken}
          />
        )}
      </div>
      <img src={authImg} alt="colage_posters" className="w-[415px] h-[650px]" />
    </div>
  );
};
