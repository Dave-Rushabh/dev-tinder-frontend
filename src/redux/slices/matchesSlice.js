import { createSlice } from "@reduxjs/toolkit";

const matchesSlice = createSlice({
  name: "matches",
  initialState: {
    data: null,
  },
  reducers: {
    REDUX_SET_MATCHES: (state, action) => {
      const { data } = action.payload;

      state.data = data;
    },
  },
});

export const { REDUX_SET_MATCHES } = matchesSlice.actions;

export default matchesSlice.reducer;
