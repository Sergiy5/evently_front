import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('admin/users');
      console.log(response);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
