import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
export const store = configureStore({
  reducer: {
    todos: taskSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
