import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userInfo: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    REDUX_HANDLE_LOG_IN: (state, action) => {
      const { user } = action.payload;

      state.isLoggedIn = true;
      state.userInfo = user;
    },
    REDUX_HANDLE_LOG_OUT: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {};
    },
  },
});

export const { REDUX_HANDLE_LOG_IN, REDUX_HANDLE_LOG_OUT } = authSlice.actions;

export default authSlice.reducer;
