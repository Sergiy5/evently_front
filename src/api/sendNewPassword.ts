import { userServices } from './getUserByEmail';

export const sendNewPassword = async (password: string, token: string) => {
  try {
    const response = await userServices.post(
      `reset-password?token=${token}&newPassword=${password}`
    );

    return response.data;
  } catch (error) {
    console.log('ERROR_FROM_AXIOS', error);
  }
};
