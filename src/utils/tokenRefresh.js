import { getRefreshToken } from "./tokenStorage";
import { API_BASE_URL } from "../config/api";

/**
 * Token Refresh Utility
 * Makes a direct fetch call to refresh tokens, bypassing RTK Query to avoid circular dependencies
 * @returns {Promise<{accessToken: string, refreshToken: string}>} New token pair
 * @throws {Error} If refresh fails
 */
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to refresh token");
    }

    const data = await response.json();
    
    if (!data.accessToken || !data.refreshToken) {
      throw new Error("Invalid token response from server");
    }

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

