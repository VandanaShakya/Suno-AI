import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";
import { baseQueryWithToast } from "../../utils/baseQueryWithToast";

/**
 * Payment API Slice
 * RTK Query endpoints for payment processing
 */
export const paymentApi = createApi({
  reducerPath: "paymentApi",
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
  tagTypes: ["UserCredits", "User"],

  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (planType) => ({
        url: "/payments/create-checkout",
        method: "POST",
        body: { plan: planType },
      }),
      invalidatesTags: ["UserCredits", "User"],
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = paymentApi;

