import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null;
  userId: number | null;
  userName: string | null;
  email: string | null;
  expiresIn: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  tokenType: null,
  userId: null,
  userName: null,
  email: null,
  expiresIn: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenType = null;
      state.userId = null;
      state.userName = null;
      state.email = null;
      state.expiresIn = null;
      state.error = null;
      state.loading = false;
    },
    setCredentials: (
        state,
        { payload }: PayloadAction<AuthState>
    ) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.tokenType = payload.tokenType;
      state.userId = payload.userId;
      state.userName = payload.userName;
      state.email = payload.email;
      state.expiresIn = payload.expiresIn;
      state.error = payload.error;
      state.loading = false;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
