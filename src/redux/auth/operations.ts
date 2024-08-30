import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUserInterface } from '@/components/LoginForm';
import { RegisterUserInterface } from '@/components/RegisterForm';
// import { RootState } from '@reduxjs/toolkit/query';


const URL = import.meta.env.VITE_MOCK_API_USER_URL;

axios.defaults.baseURL = `${URL}`;

const setAuthToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (user: RegisterUserInterface, thunkAPI) => {
    try {
      const response = await axios.post('users/register', user);
      console.log('RESPONSE_MOCK_API', response);
      // setAuthToken(response.data.token);
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (user: LoginUserInterface, thunkAPI) => {
    try {
      const response = await axios.post('users/login', user);
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('users/logout');
    clearAuthToken();
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const updateUser = createAsyncThunk(
  'auth/update',
  async (user, thunkAPI) => {
    try {
      const response = await axios.patch('/users/edit', user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: { token: string | null } };
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('You are not logged in');
    }

    try {
      setAuthToken(persistedToken);
      const response = await axios.get('users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);
