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
    REDUX_REMOVE_FROM_FEED_BY_ID: (state, action) => {
      const { userToBeRemoved } = action.payload;

      const feeds = [...state.feed].filter(
        (feed) => feed._id !== userToBeRemoved
      );

      state.feed = feeds;
    },
  },
});

export const { REDUX_SET_FEED, REDUX_REMOVE_FROM_FEED_BY_ID } =
  feedSlice.actions;

export default feedSlice.reducer;
