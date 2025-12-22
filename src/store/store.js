import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi } from "../services/api/authApi";
import { generationApi } from "../services/api/generationApi";
import { paymentApi } from "../services/api/paymentApi";
import { userApi } from "../services/api/userApi";
import { invoiceApi } from "../services/api/invoiceApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [generationApi.reducerPath]: generationApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      generationApi.middleware,
      paymentApi.middleware,
      userApi.middleware,
      invoiceApi.middleware
    ),
});

