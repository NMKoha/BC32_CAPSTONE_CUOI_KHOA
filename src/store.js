import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    AuthSlice
  },
});

export default store