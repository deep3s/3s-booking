import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authApi } from '../../services/auth.api';
import { olaMapsApi } from '../../services/olaMaps.api';
import olaMapsReducer from './olaMapsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    olaMaps: olaMapsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [olaMapsApi.reducerPath]: olaMapsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(olaMapsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
