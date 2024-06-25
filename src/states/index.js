import { configureStore } from '@reduxjs/toolkit';
import authUserSlice from './authentication/slice';
import preloadSlice from './isPreload/slice';
import postSlice from './posts/slice';
import postDetailSlice from './postDetail/slice';
import userSlice from './users/slice';
import userDetailSlice from './userDetail/slice';

const store = configureStore({
  reducer: {
    authUser: authUserSlice,
    isPreload: preloadSlice,
    posts: postSlice,
    postDetail: postDetailSlice,
    users: userSlice,
    userDetail: userDetailSlice,
  },
});

export default store;
