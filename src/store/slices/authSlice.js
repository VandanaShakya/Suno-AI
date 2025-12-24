import { createSlice } from "@reduxjs/toolkit";
import { getToken, getRefreshToken, setToken, setRefreshToken, clearTokens } from "../../utils/tokenStorage";

const initialState = {
  user: null,
  token: getToken(),
  refreshToken: getRefreshToken(),
  isAuthenticated: !!getToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      
      // Persist tokens to localStorage
      setToken(accessToken);
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      
      // Clear tokens from localStorage
      clearTokens();
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      clearTokens();
    },
  },
});

export const { setCredentials, logout, clearCredentials } = authSlice.actions;
export default authSlice.reducer;



