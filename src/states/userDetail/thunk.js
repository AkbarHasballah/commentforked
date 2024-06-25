import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearUserDetail, receiveUserDetail } from './slice';
import api from '../../utils/api';

const asyncReceiveUserDetail = createAsyncThunk(
  'asyncReceiveUserDetail',
  async (userId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(clearUserDetail());
    try {
      const userDetail = await api.getDetailUser(userId);
      dispatch(receiveUserDetail(userDetail));
    } catch (error) {
      alert(error.message);
      throw error;
    }
  },
);

export { asyncReceiveUserDetail };
