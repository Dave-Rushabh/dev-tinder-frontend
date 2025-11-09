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
    REDUX_REMOVE_REQUEST_BY_ID: (state, action) => {
      const { requestToBeRemoved } = action.payload;

      const requests = [...state.data].filter(
        (req) => req._id !== requestToBeRemoved
      );

      state.data = requests;
    },
  },
});

export const { REDUX_SET_REQUESTS, REDUX_REMOVE_REQUEST_BY_ID } =
  requestsSlice.actions;

export default requestsSlice.reducer;
