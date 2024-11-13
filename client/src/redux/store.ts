import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/redux/productSlicer";
import authReducer from "@/redux/authSlicer";

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
