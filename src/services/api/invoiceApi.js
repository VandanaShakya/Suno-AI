import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";
import { baseQueryWithToast } from "../../utils/baseQueryWithToast";

/**
 * Invoice API Slice
 * RTK Query endpoints for invoice management
 */
export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
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
  tagTypes: ["Invoice"],

  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: ({ limit = 10, offset = 0 } = {}) => ({
        url: "/invoices",
        params: { limit, offset },
      }),
      providesTags: ["Invoice"],
    }),
    getInvoice: builder.query({
      query: (invoiceId) => `/invoices/${invoiceId}`,
      providesTags: (result, error, invoiceId) => [{ type: "Invoice", id: invoiceId }],
    }),
    getInvoicePdf: builder.query({
      query: (invoiceId) => `/invoices/${invoiceId}/pdf`,
      responseHandler: async (response) => {
        // For PDF redirect, we'll handle it differently
        const url = response.url;
        return { pdfUrl: url };
      },
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useLazyGetInvoicePdfQuery,
} = invoiceApi;

