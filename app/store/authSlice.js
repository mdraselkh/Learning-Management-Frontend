import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// Load token from cookies if it exists
const tokenFromCookie = Cookies.get("token");

const initialState = {
  user: tokenFromCookie ? jwtDecode(tokenFromCookie) : null,
  isAuthenticated: !!tokenFromCookie,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;

      // Save token in cookies with 1 day (24h) expiry
      // Cookies.set("token", token, { expires: 1 });
      Cookies.set("token", token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Decode token and update state
      const decodedToken = jwtDecode(token);
      state.user = decodedToken;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      // Remove token from cookies
      Cookies.remove("token");

      // Clear state
      state.user = null;
      state.isAuthenticated = false;
    },

    loadUser: (state) => {
      const token = Cookies.get("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        state.user = decodedToken;
        state.isAuthenticated = true;
      }
    },

    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.user = { ...state.user, ...updatedUser };
    },
  },
});

export const { login, logout, loadUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
