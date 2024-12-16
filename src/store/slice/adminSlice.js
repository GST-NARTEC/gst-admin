import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  admin: {
    id: null,
    email: "info@gstsa1.org",
    createdAt: null,
    updatedAt: null,
  },
  accessToken: null,
  refreshToken: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    setAdmin: (state, action) => {
      state.admin = {
        ...state.admin,
        ...action.payload,
      };
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.admin = {
        id: null,
        email: "info@gstsa1.org",
        createdAt: null,
        updatedAt: null,
      };
    },
  },
});

// Export actions
export const { setCredentials, setAdmin, updateAccessToken, logout } =
  adminSlice.actions;

// Export selectors
export const selectCurrentAdmin = (state) => state.admin.admin;
export const selectAccessToken = (state) => state.admin.accessToken;
export const selectRefreshToken = (state) => state.admin.refreshToken;
export const selectIsAuthenticated = (state) => state.admin.isAuthenticated;

export default adminSlice.reducer;
