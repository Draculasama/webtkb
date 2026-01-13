/**
 * API Configuration
 */
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Get auth token from storage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem("access_token");
};

/**
 * Set auth token to storage
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem("access_token", token);
};

/**
 * Remove auth token from storage
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem("access_token");
};
