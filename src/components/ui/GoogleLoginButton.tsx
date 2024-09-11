import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '@/hooks/hooks';
import { googleLogin } from '@/redux/auth/authSlice';
import { jwtDecode } from 'jwt-decode'; // To decode the Google JWT token
import { FcGoogle } from 'react-icons/fc';

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

export const GoogleLoginButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const login = useGoogleLogin({
    onSuccess: (response: any) => {
      console.log(response);

      const decoded: GoogleUser = jwtDecode(response.credential);

      dispatch(
        googleLogin({
          name: decoded.name,
          email: decoded.email,
          token: response.credential, // Google JWT token
        })
      );
    },

    onError: () => {
      console.error('Google login failed');
    },
  });

  return (
    <button
      onClick={() => {
        login();
      }}
      type="button"
      className={`flex gap-2.5 items-center justify-center w-[500px] h-[70px] bg-bgColor focus:outline-none rounded-[20px]`}
    >
      <FcGoogle className="w-12 h-12" />
      Продовжити через Google
    </button>
  );
};
