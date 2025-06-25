"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // or `useSearchParams` from react-router-dom if not using Next.js
import axiosInstance from "@/app/utils/axiosInstance";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    if (!token || !userId) {
      setMessage("Invalid or missing verification link.");
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/users/verify-email?token=${token}&userId=${userId}`
        );

        setMessage(
          res.data.message ||
            "✅ Email verified successfully! Redirecting to login..."
        );
        setStatus("success");

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (err) {
        setMessage(
          err.response?.data?.error ||
            "Verification failed. Link may have expired."
        );
        setStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src="/images/herobg.png"
        alt="Hero Background"
        layout="fill" // Makes it span the full width and height
        objectFit="cover" // Ensures the image covers the entire container
        className="z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-5"></div>
      {/* Logo */}
      <Link
        href="/"
        className="text-white absolute z-20 top-4 left-8 p-5  text-xl md:text-2xl py-4 cursor-pointer font-medium rounded-full flex items-center justify-center font-sans"
      >
        <span className="text-teal-950 text-2xl md:text-3xl font-semibold rounded-full flex items-center justify-center w-8 h-8 bg-yellow-500 font-pacifico">
          l
        </span>
        earnCraft
      </Link>
      <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center z-10">
        <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center gap-5 px-8 xl:px-0">
          <div className="border bg-teal-950 rounded p-8 sm:p-10 w-auto xl:w-[38%]">
            <h2 className="text-2xl font-semibold text-white text-center mb-4">
              Email Verification
            </h2>
            <p
              className={`text-center ${
                status === "success"
                  ? "text-green-600"
                  : status === "error"
                  ? "text-red-500"
                  : "text-gray-600"
              }`}
            >
              {message}
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
