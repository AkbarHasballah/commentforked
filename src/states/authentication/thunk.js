import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setAuthUser, unsetAuthUser } from './slice';
import { notifications } from '@mantine/notifications';

const asyncSetAuthUser = createAsyncThunk(
  'asyncSetAuthUser',
  async (data, thunkAPI) => {
    const { email, password } = data;
    const { dispatch } = thunkAPI;
    try {
      const response = await api.login({ email, password });
      api.putAcessToken(response.token);
      const authUser = await api.getOwnProfile();
      notifications.show({
        title: 'Login Success',
        description: 'You have successfully logged in',
        status: 'success',
        color: 'green',
      });
      dispatch(setAuthUser(authUser));
    } catch (error) {
      notifications.show({
        title: error.message,
        description: error.message,
        status: 'error',
        color: 'red',
      });
      throw error;
    }
  },
);

const asyncUnsetAuthUser = createAsyncThunk(
  'asyncUnsetAuthUSer',
  async (data, { dispatch }) => {
    dispatch(unsetAuthUser());
    notifications.show({
      title: 'Sign Out Success',
      description: 'You have sign out',
      status: 'success',
      color: 'green',
    });
    api.putAcessToken('');
  },
);

export { asyncSetAuthUser, asyncUnsetAuthUser };
