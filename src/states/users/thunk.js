import { createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';
import api from '../../utils/api';
import { setAuthUser, unsetAuthUser } from '../authentication/slice';

const asyncRegisterUser = createAsyncThunk(
  'registerUser',
  async (data, thunkAPI) => {
    try {
      const response = await api.register(data);
      notifications.show({
        title: response.message,
        description: response.message,
        type: response.status,
        color: 'green',
      });
      return { error: null };
    } catch (error) {
      notifications.show({
        title: error.message,
        description: error.message,
        type: error.status,
        color: 'red',
      });
      throw error;
    }
  },
);

const asyncUpdateProfile = createAsyncThunk(
  'asyncUpdateProfile',
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await api.editProfileUser(data);
      notifications.show({
        title: response.msg,
        description: response.msg,
        type: response.status,
        color: 'green',
      });
      dispatch(setAuthUser(response.data));
      return { error: null };
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      notifications.show({
        title: error.message,
        description: error.message,
        type: error.status,
        color: 'red',
      });
      throw error;
    }
  },
);

const asyncChangePassword = createAsyncThunk(
  'asyncChangePassword',
  async (data, thunkAPI) => {
    try {
      const response = await api.changePassword(data);
      if (response.msg) {
        notifications.show({
          title: response.msg,
          description: response.msg,
          type: response.status,
          color: 'green',
        });
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      notifications.show({
        title: error.message,
        description: error.message,
        type: error.status,
        color: 'red',
      });
      throw error;
    }
  },
);

const asyncDeleteUserByAuth = createAsyncThunk(
  'asyncDeleteUserByAuth',
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await api.deleteUserByAuth();
      notifications.show({
        title: response.msg,
        description: response.msg,
        type: response.status,
        color: 'green',
      });
      dispatch(unsetAuthUser());
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      notifications.show({
        title: error.message,
        description: error.message,
        type: error.status,
        color: 'red',
      });
      throw error;
    }
  },
);

export {
  asyncRegisterUser,
  asyncUpdateProfile,
  asyncChangePassword,
  asyncDeleteUserByAuth,
};
