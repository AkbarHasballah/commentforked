import { createSlice } from '@reduxjs/toolkit';

const preloadSlice = createSlice({
  name: 'preload',
  initialState: true,
  reducers: {
    setIsPreload(state, action) {
      return action.payload;
    },
  },
});

export const { setIsPreload } = preloadSlice.actions;

export default preloadSlice.reducer;
