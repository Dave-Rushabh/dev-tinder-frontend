import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null,
    pagination: {
      currentPage: 1,
      limit: 10,
      totalUsers: 0,
    },
  },
  reducers: {
    REDUX_SET_FEED: (state, action) => {
      const { data, totalUsers } = action.payload;

      state.feed = data;
      state.pagination.totalUsers = totalUsers;
    },
    REDUX_FETCH_NEXT_PAGE: (state, action) => {
      const { nextPage } = action.payload;

      state.pagination.currentPage = nextPage;
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

export const {
  REDUX_SET_FEED,
  REDUX_REMOVE_FROM_FEED_BY_ID,
  REDUX_FETCH_NEXT_PAGE,
} = feedSlice.actions;

export default feedSlice.reducer;
