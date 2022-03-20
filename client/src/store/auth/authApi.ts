import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'store/store'

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  token: string;
  userid: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', token)
      }
  
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
        validateStatus: (response, result) =>  response.status === 200 && result.token
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
