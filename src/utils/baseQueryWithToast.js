import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

/**
 * Wraps fetchBaseQuery to automatically show toast notifications on errors
 * @param {object} options - Options for fetchBaseQuery
 * @returns {Function} - Base query function with error handling
 */
export const baseQueryWithToast = (options) => {
  const baseQuery = fetchBaseQuery(options);

  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    // Show toast on error
    if (result.error) {
      const error = result.error;
      
      // Extract error message
      let errorMessage = "An unexpected error occurred";
      
      if (error.data?.error?.message) {
        errorMessage = error.data.error.message;
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.status === "FETCH_ERROR") {
        errorMessage = "Network error. Please check your connection.";
      } else if (error.status === "PARSING_ERROR") {
        errorMessage = "Failed to parse server response.";
      } else if (error.status === "CUSTOM_ERROR") {
        errorMessage = error.error || "An error occurred";
      }

      // Show toast notification
      toast.error(errorMessage);
    }

    return result;
  };
};

