import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "request",
  initialState: {
    data: null,
  },
  reducers: {
    REDUX_SET_REQUESTS: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
  },
});

export const { REDUX_SET_REQUESTS } = requestsSlice.actions;

export default requestsSlice.reducer;
