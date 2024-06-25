import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setAuthUser } from '../authentication/slice';
import { setIsPreload } from './slice';

const asyncPreloadProcess = createAsyncThunk(
  'asyncPreloadProcess',
  async (data, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      dispatch(setAuthUser(null));
    } finally {
      dispatch(setIsPreload(false));
    }
  },
);

export { asyncPreloadProcess };
