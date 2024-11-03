import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://rendereventapp.onrender.com/api/v1/';

const setAuthToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchLikedEvents = createAsyncThunk<
  Event[],
  { userId: string; token?: string },
  {
    rejectValue: string;
  }
>('events/getLikedEvents', async ({ userId, token }, { rejectWithValue }) => {
  try {
    if (token) {
      setAuthToken(token);
    }
    const response = await axios(`liked-events/${userId}`);
    const resData = response.data.eventsList;
    return resData;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
