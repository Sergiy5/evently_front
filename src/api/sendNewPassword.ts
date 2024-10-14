import { userServices } from './getUserByEmail';

export const sendNewPassword = async (password: string, token: string) => {
  console.log(token, password);
  try {
    const response = await userServices.post(
      `reset-password/?token=${token}&newPassword=${password}`
    );
    console.log('API_response.data_>>>>>>>>>>>>>', response.data);

    // return response.data
  } catch (error) {
    console.log('ERROR_FROM_AXIOS', error);
  }
};


