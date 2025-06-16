"use client";
import SectionList from "@/app/(dashboard)/_components/SectionList";
import Loading from "@/app/loading";
import { setCanAccess } from "@/app/store/courseAccessSlice";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.auth.user);
  const sessionId = searchParams.get("session_id");
  const [courseId, setCourseId] = useState();
  const [userId, setUserId] = useState();
  const [accessList, setAccessList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/payment/verify-payment?session_id=${sessionId}`
        );
        console.log(res);
        if (res.data.success) {
          setIsVerified(true);
          setCourseId(res.data.courseId);
          setUserId(res.data.userId);
        }
      } catch (err) {
        console.error("Verification failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) verifyPayment();
  }, [sessionId]);

  // const fetchSectionsAccess = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/api/section/${courseId}/getSections?userId=${userId}`
  //     );
  //     console.log(response);
  //     setAccessList(response.data.sections);
  //     const allAccessible = accessList.every(
  //       (section) => section.canAccess === true
  //     );

  //     if (allAccessible) {
  //       dispatch(setCanAccess(true));
  //     }
  //   } catch (error) {
  //     console.log("error while fetching sections access", error);
  //   }
  // };

  // useEffect(() => {
  //   if (userId && courseId) {
  //     fetchSectionsAccess();
  //   }
  // }, [userId, courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-950">
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg max-w-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 text-red-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h1 className="text-xl font-semibold text-red-600">
            Payment Not Verified
          </h1>
          <p className="mt-2 text-gray-600">
            Something went wrong. Please contact support or try again later.
          </p>
          <Link href="/">
            <button className="mt-6 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-900 to-teal-700 text-white">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl max-w-md text-center text-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mx-auto mb-4 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2l4-4m5-2a9 9 0 11-18 0a9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">
          Thanks for your purchase. Your transaction was completed successfully.
        </p>
        <Link href="/my-courses">
          <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Go to My Courses
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
