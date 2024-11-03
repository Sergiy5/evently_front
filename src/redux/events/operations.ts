import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://rendereventapp.onrender.com/api/v1/';

export const fetchLikedEvents = createAsyncThunk<
  Event[],
  string,
  {
    rejectValue: string;
  }
>('events/getLikedEvents', async (id, { rejectWithValue }) => {
  try {
    const response = await axios(`liked-events/${id}`);
    const resData = response.data.eventsList;
    return resData;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
