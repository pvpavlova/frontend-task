import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import quoteReducer from "./quoteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    quote: quoteReducer,
  },
});

export default store;
