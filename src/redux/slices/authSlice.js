import { createSlice } from "@reduxjs/toolkit";

const saveToken = (token, rememberMe) => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");

  if (rememberMe) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || sessionStorage.getItem("token"),
    isAuthenticated: !!(localStorage.getItem("token") || sessionStorage.getItem("token")),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      saveToken(action.payload.token, action.payload.rememberMe);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
