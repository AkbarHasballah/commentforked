import { createAsyncThunk } from '@reduxjs/toolkit';
import { receiveUsers } from '../users/slice';
import { receivePosts, resetPosts } from '../posts/slice';
import api from '../../utils/api';

const asyncHomePostsAndUsers = createAsyncThunk(
  'asyncHomePostsAndUsers',
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(resetPosts());
    try {
      const response = await api.getPostsHome();
      dispatch(receivePosts(response.data.posts));
      dispatch(receiveUsers(response.data.users));
    } catch (error) {
      alert(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const asyncForumPostsAndUsers = createAsyncThunk(
  'asyncForumPostsAndUsers',
  async (page, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await api.getPostsForum(page);
      return {
        data: response.data,
        hasMore: response.data.length > 0, // Adjust this according to your API response
        page,
      };
    } catch (error) {
      alert(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const asyncForumPostsAndUsersByTrends = createAsyncThunk(
  'asyncForumPostsAndUsersByTrends',
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(resetPosts());
    try {
      const response = await api.getPostsTrends();
      dispatch(receivePosts(response));
    } catch (error) {
      alert(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const asyncForumPostsAndUsersByUpcoming = createAsyncThunk(
  'asyncForumPostsAndUsersByUpcoming',
  async (data, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(resetPosts());
    try {
      const response = await api.getPostsUpcoming();
      dispatch(receivePosts(response));
    } catch (error) {
      alert(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const asyncForumPostsAndUsersBookmark = createAsyncThunk(
  'asyncForumPostsAndUsersBookmark',
  async (userId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(resetPosts());
    try {
      const response = await api.getPostsBookmarks(userId);
      dispatch(receivePosts(response));
    } catch (error) {
      alert(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const asyncForumMyPosts = createAsyncThunk(
  'asyncForumMyPosts',
  async (userId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(resetPosts());
    try {
      const response = await api.getMyPosts(userId);
      dispatch(receivePosts(response));
    } catch (error) {
      alert(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const asyncForumRecentEvents = createAsyncThunk(
  'asyncForumRecentEvents',
  async (eventId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(resetPosts());
    try {
      const response = await api.getRecentEvents(eventId);
      dispatch(receivePosts(response));
    } catch (error) {
      alert(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export {
  asyncHomePostsAndUsers,
  asyncForumPostsAndUsers,
  asyncForumPostsAndUsersByTrends,
  asyncForumPostsAndUsersByUpcoming,
  asyncForumPostsAndUsersBookmark,
  asyncForumMyPosts,
  asyncForumRecentEvents,
};
