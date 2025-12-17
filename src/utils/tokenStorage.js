/**
 * Token Storage Utilities
 * Manages authentication tokens in localStorage
 */

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * Get access token from localStorage
 * @returns {string|null} Access token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Set access token in localStorage
 * @param {string} token - Access token to store
 */
export const setToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * Remove access token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

/**
 * Get refresh token from localStorage
 * @returns {string|null} Refresh token or null if not found
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Set refresh token in localStorage
 * @param {string} token - Refresh token to store
 */
export const setRefreshToken = (token) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * Remove refresh token from localStorage
 */
export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Clear all authentication tokens from localStorage
 */
export const clearTokens = () => {
  removeToken();
  removeRefreshToken();
};


