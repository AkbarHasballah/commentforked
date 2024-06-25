import { createSlice } from '@reduxjs/toolkit';
import {
  asyncForumPostsAndUsers,
  asyncHomePostsAndUsers,
} from '../shared/thunk';

const initialState = {
  data: [],
  status: 'idle',
  hasMore: true,
  page: 1,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    resetPosts: (state) => {
      state.data = [];
      state.page = 1;
      state.hasMore = true;
    },
    receivePosts: (state, action) => {
      state.page = 1;
      state.status = 'idle';
      state.data = action.payload;
    },
    addPost: (state, action) => {
      state.data.unshift(action.payload);
    },
    deletePost: (state, action) => {
      const updatedPosts = state.data.filter(
        (post) => post.id !== action.payload,
      );
      state.data = updatedPosts;
    },
    addBookmarkPost: {
      reducer(state, action) {
        const updatedPosts = state.data.map((post) => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              bookmarks: [action.payload.user.data, ...post.bookmarks],
            };
          }
          return post;
        });
        state.data = updatedPosts;
      },
      prepare(postId, user) {
        return { payload: { postId, user } };
      },
    },

    removeBookmarkPost: {
      reducer(state, action) {
        const updatedPosts = state.data.map((post) => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              bookmarks: post.bookmarks.filter(
                (bookmark) => bookmark.userId !== action.payload.userId,
              ),
            };
          }
          return post;
        });
        state.data = updatedPosts;
      },
      prepare(postId, userId) {
        return { payload: { postId, userId } };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncForumPostsAndUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncForumPostsAndUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = [...state.data, ...action.payload.data];
        state.hasMore = action.payload.hasMore;
        state.page = action.payload.page + 1; // Increment page for next fetch
      })
      .addCase(asyncForumPostsAndUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  incrementPage,
  resetPosts,
  receivePosts,
  addPost,
  deletePost,
  addBookmarkPost,
  removeBookmarkPost,
} = postSlice.actions;

export default postSlice.reducer;
