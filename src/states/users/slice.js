import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    receiveUsers: {
      reducer(state, action) {
        return action.payload.users;
      },
      prepare(users) {
        return { payload: { users } };
      },
    },
  },
});

export const { receiveUsers } = userSlice.actions;

export default userSlice.reducer;
