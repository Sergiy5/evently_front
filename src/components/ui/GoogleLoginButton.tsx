import React, { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '@/hooks/hooks';
// import { googleLogin } from '@/redux/auth/authSlice';
// import { jwtDecode } from 'jwt-decode'; // To decode the Google JWT token
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

export const GoogleLoginButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const login = useGoogleLogin({
    onSuccess: (response: any) => {
      console.log('RESPONSE_credential_TOKEN_>>>>>>>>', response.access_token);

      const fetchUserInfo = async (accessToken: string) => {
        try {
          const res = await fetch(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const userInfo = await res.json();
          toast.success(`Welcome ${userInfo.name}!`);

          // console.log('userInfo', userInfo);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      fetchUserInfo(response.access_token);

      // dispatch(
      //   googleLogin({
      //     name: 'name',
      //     email: email,
      //     token: response.access_token, // Google JWT token
      //   })
      // );
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
      className={`flex gap-2.5 items-center justify-center w-[500px] h-[70px] bg-background focus:outline-none rounded-[20px]`}
    >
      <FcGoogle className="w-12 h-12" />
      Продовжити через Google
    </button>
  );
};
