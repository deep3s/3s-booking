import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authApi } from '../../services/auth.api';
import { olaMapsApi } from '../../services/olaMaps.api';
import olaMapsReducer from './olaMapsSlice';
import searchSalonsReducer from './searchSalonsSlice';
import { searchSalonsApi } from '../../services/searchSalons.api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    olaMaps: olaMapsReducer,
    searchSalons: searchSalonsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [olaMapsApi.reducerPath]: olaMapsApi.reducer,
    [searchSalonsApi.reducerPath]: searchSalonsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(olaMapsApi.middleware)
      .concat(searchSalonsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
