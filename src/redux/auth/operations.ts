import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserInterface } from '@/components/Auth';
// import { RootState } from '@reduxjs/toolkit/query';

axios.defaults.baseURL = 'https://goose-track-06-backend.onrender.com/api/';

const setAuthToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (user: UserInterface | {}, thunkAPI) => {
    console.log("USER_IN REGISTER", user)
    // try {
    //   const response = await axios.post('users/register', user);
    //   setAuthToken(response.data.token);
    //   return response.data;
    // } catch (error: unknown) {
    //   return thunkAPI.rejectWithValue((error as Error).message);
    // }
    return user
  }
);

export const logIn = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await axios.post('users/login', user);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

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
