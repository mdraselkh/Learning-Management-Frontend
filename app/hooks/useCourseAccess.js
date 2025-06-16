'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAccessForCourse } from "../store/courseAccessSlice";
import { getAccessFromStorage, setAccessToStorage } from "../utils/accessStorage";

export const useCourseAccess = (userId, courseId) => {
  const dispatch = useDispatch();
  const key = `access_${userId}_${courseId}`;
  const accessData = useSelector((state) => state.courseAccess.accessMap[key]);
  const [loading, setLoading] = useState(!accessData);

  useEffect(() => {
    const fetchAccess = async () => {
      if (accessData) return;

      const saved = getAccessFromStorage(key);
      if (saved) {
        dispatch(setAccessForCourse({ key, accessData: saved }));
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/section/${courseId}/getSections?userId=${userId}`
        );

        const allSections = res.data.sections;
        const hasFullAccess = allSections.every((section) => section.can_access === true);

        dispatch(setAccessForCourse({ key, accessData: hasFullAccess }));

        setAccessToStorage(key, hasFullAccess);
      } catch (err) {
        console.error("Error fetching access:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId && courseId) fetchAccess();
  }, [userId, courseId]);

  return { accessData, loading };
};
