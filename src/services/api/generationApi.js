import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";
import { baseQueryWithToast } from "../../utils/baseQueryWithToast";

/**
 * Generation API Slice
 * RTK Query endpoints for music generation
 */
export const generationApi = createApi({
  reducerPath: "generationApi",
  baseQuery: baseQueryWithToast({
    baseUrl: `${API_BASE_URL}/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["GenerationTask", "AudioResult", "UserCredits"],
  endpoints: (builder) => ({
    generateMusic: builder.mutation({
      query: (payload) => ({
        url: "/generate",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["GenerationTask", "AudioResult", "UserCredits"],
    }),
    getTask: builder.query({
      query: (taskId) => `/tasks/${taskId}`,
      providesTags: (result, error, taskId) => [{ type: "GenerationTask", id: taskId }],
    }),
    getUserAudio: builder.query({
      query: ({ limit = 20, cursor } = {}) => {
        const params = new URLSearchParams();
        params.append("limit", limit.toString());
        if (cursor) {
          params.append("cursor", cursor);
        }
        return `/audio?${params.toString()}`;
      },
      providesTags: ["AudioResult"],
    }),
    getUserCredits: builder.query({
      query: () => "/user/credits",
      providesTags: ["UserCredits"],
    }),
    getUserAudioCount: builder.query({
      query: () => "/audio/count",
      providesTags: ["AudioResult"],
    }),
    downloadAudio: builder.mutation({
      query: (audioId) => ({
        url: `/audio/${audioId}/download`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGenerateMusicMutation,
  useGetTaskQuery,
  useLazyGetTaskQuery,
  useGetUserAudioQuery,
  useGetUserCreditsQuery,
  useGetUserAudioCountQuery,
  useDownloadAudioMutation,
} = generationApi;

