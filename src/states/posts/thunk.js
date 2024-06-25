import { createAsyncThunk } from '@reduxjs/toolkit';
import { addBookmarkPost, addPost, removeBookmarkPost } from './slice';
import api from '../../utils/api';
import { notifications } from '@mantine/notifications';

const asyncAddPost = createAsyncThunk('addPost', async (data, thunkAPI) => {
  const {
    title,
    description,
    image,
    startDate,
    endDate,
    maxParticipants,
    category,
  } = data;
  const { dispatch } = thunkAPI;
  try {
    const post = await api.createPost({
      title,
      description,
      image,
      startDate,
      endDate,
      maxParticipants,
      category,
    });
    notifications.show({
      title: post.msg,
      description: post.msg,
      type: post.status,
      color: 'green',
    });
    dispatch(addPost(post.data));
    return { error: null };
  } catch (error) {
    thunkAPI.rejectWithValue(error);
    alert(error.message);
    throw error;
  }
});

const asyncAddBookmarkPost = createAsyncThunk(
  'addBookmarkPost',
  async (postId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await api.addBookmark({ postId });
      notifications.show({
        title: response.msg,
        description: response.msg,
        type: response.status,
        color: 'green',
      });
      dispatch(addBookmarkPost(postId, response));
      return { error: null };
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      alert(error.message);
      throw error;
    }
  },
);

const asyncRemoveBookmarkPost = createAsyncThunk(
  'removeBookmarkPost',
  async (payload, thunkAPI) => {
    const { postId, userId } = payload;
    const { dispatch } = thunkAPI;
    try {
      const response = await api.removeBookmark({ postId });
      notifications.show({
        title: response.msg,
        description: response.msg,
        type: response.status,
        color: 'green',
      });
      dispatch(removeBookmarkPost(postId, userId));
      return { error: null };
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      alert(error.message);
      throw error;
    }
  },
);

export { asyncAddPost, asyncAddBookmarkPost, asyncRemoveBookmarkPost };
