import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    userId: number;
    userName: string;
    email: string;
    expiresIn: number;
  };
  error: string | null;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
