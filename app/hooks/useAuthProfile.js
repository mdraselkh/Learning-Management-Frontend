"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/app/utils/axiosInstance";
import { setUser } from "../store/authSlice";
import { showErrorToast } from "../utils/sweetAlert";

const useAuthProfile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.get("/api/users/auth/profile");
        console.log(res.data.user);
        dispatch(setUser(res.data.user));
      } catch (err) {
        if (err.response?.status === 403 || err.response?.status === 401 || err.response?.data?.message === "Token expired") {
          dispatch(logout());
          showErrorToast("Session expired. Please login again.");
        }
      } finally {
        setLoading(false); // ✅ Done loading
      }
    };

    fetchProfile();
  }, [token, dispatch]);

  return { loading };
};

export default useAuthProfile;
