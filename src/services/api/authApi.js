import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";
import { setCredentials, logout } from "../../store/slices/authSlice";
import { baseQueryWithToast } from "../../utils/baseQueryWithToast";

/**
 * Auth API Slice
 * RTK Query endpoints for authentication
 */
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithToast({
    baseUrl: `${API_BASE_URL}/v1/auth`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // After successful registration, automatically log in
          // Note: Backend returns userId, we may need to call login endpoint
          // For now, we'll handle this in the component
        } catch (error) {
          // Error handling is done by RTK Query
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Extract user info from token or make a separate call
          // For now, we'll create a minimal user object
          // In a real app, you might decode the JWT or fetch user profile
          const user = {
            email: arg.email,
            // We'll need to fetch full user data separately or decode token
          };
          
          dispatch(
            setCredentials({
              user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
        } catch (error) {
          // Error handling is done by RTK Query
        }
      },
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/refresh",
        method: "POST",
        body: { refreshToken },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const currentUser = getState().auth?.user;
          dispatch(
            setCredentials({
              user: currentUser || null, // Preserve existing user
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
        } catch (error) {
          // If refresh fails, logout user
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshTokenMutation } = authApi;

