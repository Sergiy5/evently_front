import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://rendereventapp.onrender.com/api/v1/';

export const likedEvents = createAsyncThunk<
  Event[],
  string,
  {
    rejectValue: string;
  }
>('events/getLikedEvents', async (id, { rejectWithValue }) => {
  try {
    const response = await axios(`liked-events/${id}`);
    const resData = response.data.eventsList;
    console.log(resData);

    return resData;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getLikedEventsCount = async (id: string) => {
  try {
    const response = await axios(`liked-events/count/${id}`);
    const resData: number = response.data;
    return resData;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get events');
  }
};
