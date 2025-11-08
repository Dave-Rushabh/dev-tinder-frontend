import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null,
    pagination: {
      currentPage: 0,
      limit: 10,
    },
  },
  reducers: {
    REDUX_SET_FEED: (state, action) => {
      const { data, currentPage } = action.payload;

      state.feed = data;
      state.pagination.currentPage = currentPage + 1;
    },
  },
});

export const { REDUX_SET_FEED } = feedSlice.actions;

export default feedSlice.reducer;
