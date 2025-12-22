import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";

/**
 * User API Slice
 * RTK Query endpoints for user profile and management
 */
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/v1`,
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
    getUserProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserProfileQuery } = userApi;

