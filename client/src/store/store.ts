import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { gqlApi } from "store/gql/gqlApi";
import { authApi } from "store/auth/authApi";
import authReducer from "store/auth/authSlice";
import profileReducer from "store/profile/profileSlice";

const store = configureStore({
  reducer: {
    [gqlApi.reducerPath]: gqlApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gqlApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
