// utils/axiosInstance.js

import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  // baseURL: 'http://localhost:5000',
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Add token from cookies to headers before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.warn("Not logged in or session expired.");
        window.location.href = "/login";
      }

      if (status === 403) {
        console.warn("Forbidden: You don't have access.");
      }

      if (status === 500) {
        console.error("Server error. Please try again later.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
