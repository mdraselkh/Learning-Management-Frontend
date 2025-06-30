// utils/axiosInstance.js

import axios from "axios";
import Cookies from "js-cookie";
import { showErrorToast } from "./sweetAlert";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
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
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      // 💣 Remove token and redirect to login
      Cookies.remove("token");

      const message =
        error.response?.data?.message ||
        "Session expired. Please log in again.";
      showErrorToast(message);

      // Small delay so toast is visible before redirect
      setTimeout(() => {
        window.location.href = "/login?session-expired=true";
      }, 1500);
    }

    if (status === 500) {
      console.error("🔥 Server error:", error.response?.data);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
