import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// Load token from cookies if it exists
const tokenFromCookie = Cookies.get("token");

const initialState = {
  token: tokenFromCookie || null,
  // user: tokenFromCookie ? jwtDecode(tokenFromCookie) : null,
  user: null,
  isAuthenticated: !!tokenFromCookie,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login: (state, action) => {
    //   const token = action.payload;

    //   // Save token in cookies with 1 day (24h) expiry
    //   // Cookies.set("token", token, { expires: 1 });
    //   Cookies.set("token", token, {
    //     expires: 1,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //   });

    //   // Decode token and update state
    //   const decodedToken = jwtDecode(token);
    //   state.user = decodedToken;
    //   state.isAuthenticated = true;
    // },

    login: (state, action) => {
      const token = action.payload;
      Cookies.set("token", token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      state.token = token;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      // Remove token from cookies
      Cookies.remove("token");

      // Clear state
      state.token = null;
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

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUser, setUser } = authSlice.actions;
export default authSlice.reducer;
