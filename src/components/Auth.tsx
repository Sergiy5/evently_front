import React, { useEffect, useState } from 'react';
import { RegisterInputEmail } from './RegisterInputEmail';
import { Login } from './Login';
import { RegisterInputPassword, RegisterUserInterface } from './RegisterInputPassword';
import { RegisterConirmEmail } from './RegisterConfirmEmail';
import { useAppDispatch } from '@/hooks/hooks';
import { register as registerUser } from '@/redux/auth/operations';


interface AuthProps {
  onCloseModal: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onCloseModal }) => {
    // const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({email:'',password:'', name: ''});

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

        console.log(result);
        // !result?.error
        //   ? toast.success('Welcome!')
        //   : toast.error('You are not logged in');
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
    onRegisterUser();
  }, [userData.password]);
  
  console.log('userData_>>>>>>>>>>>>>', userData);
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
          setStatusAuth={handleStatusAuth}
        />
      )}
      {statusAuth === 'register_password' && (
        <RegisterInputPassword setUserData={setUserData} setStatusAuth={handleStatusAuth} />
      )}
      {statusAuth === 'confirm_email' && (
        <RegisterConirmEmail setStatusAuth={handleStatusAuth} />
      )}
      {/* {isLoading && <div>LOADING...</div>} */}
      <img src="public/images/auth-form.webp" alt="colage_posters" />
    </div>
  );
};
