import { toast } from "sonner";

/**
 * Extracts error message from RTK Query error response
 * @param {any} error - RTK Query error object
 * @returns {string} - Error message to display
 */
export const getErrorMessage = (error) => {
  // RTK Query error structure: error.data?.error?.message
  if (error?.data?.error?.message) {
    return error.data.error.message;
  }
  
  // Fallback to error message
  if (error?.message) {
    return error.message;
  }
  
  // Network errors
  if (error?.status === "FETCH_ERROR") {
    return "Network error. Please check your connection.";
  }
  
  // Default message
  return "An unexpected error occurred. Please try again.";
};

/**
 * Shows a toast notification for API errors
 * @param {any} error - RTK Query error object
 * @param {string} defaultMessage - Optional default message if error parsing fails
 */
export const showErrorToast = (error, defaultMessage = null) => {
  const message = defaultMessage || getErrorMessage(error);
  toast.error(message);
};

