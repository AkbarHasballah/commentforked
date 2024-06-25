import { createAsyncThunk } from '@reduxjs/toolkit';
import fakeApi from '../../utils/fakeApi';
import {
  addBookmarkPostDetail,
  addCommentPostDetail,
  clearPostDetail,
  deleteCommentPostDetail,
  editCommentPostDetail,
  joinParticipantEvent,
  leaveParticipantEvent,
  receivePostDetail,
  removeBookmarkPostDetail,
  updatePostDetail,
} from './slice';
import api from '../../utils/api';
import { deletePost } from '../posts/slice';
import { notifications } from '@mantine/notifications';

const asyncReceivePostDetail = createAsyncThunk(
  'asyncReceivePostDetail',
  async (postId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(clearPostDetail());
    try {
      const postDetail = await api.getDetailPost(postId);
      dispatch(receivePostDetail(postDetail));
    } catch (error) {
      alert(error.message);
      throw error;
    }
  },
);

const asyncEditPost = createAsyncThunk('editPost', async (data, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  const {
    title,
    description,
    category,
    image,
    startDate,
    endDate,
    maxParticipants,
  } = data;
  try {
    const post = await api.editPost({
      postId: getState().postDetail.id,
      title,
      category,
      description,
      image,
      startDate,
      endDate,
      maxParticipants,
    });
    notifications.show({
      title: post.msg,
      description: post.msg,
      type: post.status,
      color: 'green',
    });
    dispatch(updatePostDetail(post.data));
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
});

const asyncDeletePost = createAsyncThunk(
  'deletePost',
  async (postId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await api.deletePost(postId);
      dispatch(deletePost(postId));
      notifications.show({
        title: response.msg,
        description: response.msg,
        type: response.status,
        color: 'green',
      });
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

const asyncAddComment = createAsyncThunk(
  'addComment',
  async (data, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    try {
      const comment = await api.addComment({
        postId: getState().postDetail.id,
        content: data,
      });
      notifications.show({
        title: 'Comment added',
        description: 'Your comment has been added',
        type: comment.status,
        color: 'green',
      });
      dispatch(addCommentPostDetail(comment));
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

const asyncEditComment = createAsyncThunk(
  'editComment',
  async (data, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const { commentId, content } = data;
    try {
      const comment = await api.editComment({
        postId: getState().postDetail.id,
        commentId,
        content,
      });
      notifications.show({
        title: comment.msg,
        description: comment.msg,
        type: 'success',
        color: 'green',
      });
      dispatch(editCommentPostDetail(comment.data));
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

const asyncDeleteComment = createAsyncThunk(
  'deleteComment',
  async (commentId, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    try {
      const response = await api.deleteComment({
        postId: getState().postDetail.id,
        commentId,
      });
      notifications.show({
        title: response.msg,
        description: response.msg,
        type: 'success',
        color: 'green',
      });
      dispatch(deleteCommentPostDetail(commentId));
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

const asyncJoinEvent = createAsyncThunk(
  'joinEvent',
  async (eventId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await api.joinEvent({
        eventId,
      });
      notifications.show({
        title: response.msg,
        description: response.msg,
        type: 'success',
        color: 'green',
      });
      dispatch(joinParticipantEvent(response.data));
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

const asyncLeaveEvent = createAsyncThunk(
  'leaveEvent',
  async (eventId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await api.leaveEvent({
        eventId,
      });
      notifications.show({
        title: response.msg,
        description: response.msg,
        type: 'success',
        color: 'green',
      });
      dispatch(leaveParticipantEvent(response.data));
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
const asyncAddBookmarkPostDetail = createAsyncThunk(
  'asyncAddBookmark',
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
      dispatch(addBookmarkPostDetail(response.data));
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

const asyncRemoveBookmarkPostDetail = createAsyncThunk(
  'asyncDeleteBookmark',
  async (postId, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await api.removeBookmark({ postId });
      
      notifications.show({
        title: response.msg,
        description: response.msg,
        type: response.status,
        color: 'green',
      });
      dispatch(removeBookmarkPostDetail(response.data));
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

export {
  asyncReceivePostDetail,
  asyncEditPost,
  asyncDeletePost,
  asyncAddComment,
  asyncEditComment,
  asyncDeleteComment,
  asyncJoinEvent,
  asyncLeaveEvent,
  asyncAddBookmarkPostDetail,
  asyncRemoveBookmarkPostDetail,
};
