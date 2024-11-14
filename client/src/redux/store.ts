import authReducer from "@/redux/slicers/authSlicer";
import { configureStore } from "@reduxjs/toolkit";
import { productQuery } from "@/redux/queries/productApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [productQuery.reducerPath]: productQuery.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productQuery.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
