import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import feedReducer from "./slices/feedSlice";
import matchesReducer from "./slices/matchesSlice";
import requestsReducer from "./slices/requestsSlice";

const store = configureStore({
  reducer: {
    authReducer,
    feedReducer,
    matchesReducer,
    requestsReducer,
  },
});

export default store;
