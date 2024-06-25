import { createSlice } from '@reduxjs/toolkit';

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: null,
  reducers: {
    receiveUserDetail(state, action) {
      return action.payload;
    },
    clearUserDetail() {
      return null;
    },
  },
});

export const { receiveUserDetail, clearUserDetail } = userDetailSlice.actions;
export default userDetailSlice.reducer;
