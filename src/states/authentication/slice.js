import { createSlice } from '@reduxjs/toolkit';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser: {
      reducer(state, action) {
        return action.payload.authUser;
      },
      prepare(authUser) {
        return { payload: { authUser } };
      },
    },
    unsetAuthUser() {
      return null;
    },
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
