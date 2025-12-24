import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { refreshAccessToken } from "./tokenRefresh";
import { setCredentials, logout } from "../store/slices/authSlice";

// Track ongoing refresh to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshPromise = null;

/**
 * Check if the endpoint is an auth endpoint that should skip token refresh
 * @param {string} url - The request URL
 * @returns {boolean} True if it's an auth endpoint
 */
const isAuthEndpoint = (url) => {
  if (typeof url !== "string") return false;
  const authPaths = ["/auth/login", "/auth/register", "/auth/refresh"];
  return authPaths.some((path) => url.includes(path));
};

/**
 * Wraps fetchBaseQuery to automatically show toast notifications on errors
 * and handle automatic token refresh on 401 errors
 * @param {object} options - Options for fetchBaseQuery
 * @returns {Function} - Base query function with error handling and token refresh
 */
export const baseQueryWithToast = (options) => {
  const baseQuery = fetchBaseQuery(options);

  return async (args, api, extraOptions) => {
    // Skip refresh logic for auth endpoints
    const url = typeof args === "string" ? args : args?.url;
    const shouldSkipRefresh = isAuthEndpoint(url);

    let result = await baseQuery(args, api, extraOptions);
    let attemptedRefresh = false;

    // Handle 401 errors with automatic token refresh
    if (result.error && result.error.status === 401 && !shouldSkipRefresh) {
      const refreshToken = api.getState().auth?.refreshToken || 
                          localStorage.getItem("refreshToken");

      // Only attempt refresh if we have a refresh token
      if (refreshToken) {
        attemptedRefresh = true;
        
        // If already refreshing, wait for that to complete
        if (isRefreshing && refreshPromise) {
          try {
            await refreshPromise;
            // Retry original request with new token
            result = await baseQuery(args, api, extraOptions);
            // If still 401 after refresh, logout
            if (result.error && result.error.status === 401) {
              api.dispatch(logout());
              toast.error("Session expired. Please log in again.");
            }
            return result;
          } catch (error) {
            // Refresh failed, logout
            api.dispatch(logout());
            toast.error("Session expired. Please log in again.");
            return result;
          }
        }

        // Start refresh process
        isRefreshing = true;
        refreshPromise = refreshAccessToken()
          .then((tokens) => {
            // Update Redux state with new tokens
            const currentUser = api.getState().auth?.user;
            api.dispatch(
              setCredentials({
                user: currentUser || null,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
              })
            );
            return tokens;
          })
          .catch((error) => {
            // Refresh failed, logout user
            api.dispatch(logout());
            throw error;
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });

        try {
          await refreshPromise;
          // Retry original request with new token
          result = await baseQuery(args, api, extraOptions);
          
          // If still 401 after refresh, logout
          if (result.error && result.error.status === 401) {
            api.dispatch(logout());
            toast.error("Session expired. Please log in again.");
            return result;
          }
          
          // Return successful retry result (don't show error toast for the retry)
          return result;
        } catch (error) {
          // Refresh failed, logout and show error
          api.dispatch(logout());
          toast.error("Session expired. Please log in again.");
          return result;
        }
      } else {
        // No refresh token available, logout
        api.dispatch(logout());
        toast.error("Session expired. Please log in again.");
        attemptedRefresh = true;
      }
    }

    // Show toast on error (but skip if we just handled a 401 with refresh attempt)
    if (result.error && !attemptedRefresh) {
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

