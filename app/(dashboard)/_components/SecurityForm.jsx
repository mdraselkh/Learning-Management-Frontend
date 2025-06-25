"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SecurityForm = () => {
  const user = useSelector((state) => state.auth.user);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password form submitted");
    // TODO: Add logic here to send password update to backend
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Email form submitted:", email);
    // TODO: Add logic here to send email update to backend
  };

  return (
    <div className="my-5 p-5 rounded-md border border-gray-200 bg-white w-full">
      <div className="w-full">
        <h2 className="text-xl font-semibold">Change Password</h2>
        <p className="text-gray-600">
          Can't remember your current password?{" "}
          <Link href="/reset" className="underline text-gray-800">
            Reset your password via email
          </Link>
        </p>

        <form className="mt-5 space-y-4" onSubmit={handlePasswordSubmit}>
          {/* Current Password */}
          <div className="relative w-2/3">
            <p className="text-gray-700">
              Current Password <span className="text-red-500">*</span>
            </p>
            <input
              type={showCurrent ? "text" : "password"}
              className="border w-full p-2 rounded-md pr-10"
              required
            />
            <div
              className="absolute right-2 top-[36px] cursor-pointer"
              onClick={() => setShowCurrent((prev) => !prev)}
            >
              {showCurrent ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>

          {/* New Password */}
          <div className="relative w-2/3">
            <p className="text-gray-700">
              New Password <span className="text-red-500">*</span>
            </p>
            <input
              type={showNew ? "text" : "password"}
              className="border w-full p-2 rounded-md pr-10"
              required
            />
            <div
              className="absolute right-2 top-[36px] cursor-pointer"
              onClick={() => setShowNew((prev) => !prev)}
            >
              {showNew ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative w-2/3">
            <p className="text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </p>
            <input
              type={showConfirm ? "text" : "password"}
              className="border w-full p-2 rounded-md pr-10"
              required
            />
            <div
              className="absolute right-2 top-[36px] cursor-pointer"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-full text-white font-semibold bg-teal-700 hover:bg-teal-500"
          >
            Change Password
          </button>
        </form>
      </div>

      <div className="border border-gray-300 my-5"></div>

      {/* Email Change Form */}
      <div>
        <h2 className="text-xl font-semibold">Change Email</h2>
        <p className="text-gray-600">
          Your current email address is
          <span className="text-gray-800 ml-2">{user.email}</span>
        </p>

        <form className="mt-5 space-y-4" onSubmit={handleEmailSubmit}>
          <div className="w-2/3">
            <p className="text-gray-700">
              New Email Address <span className="text-red-500">*</span>
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border w-full p-2 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-full text-white font-semibold bg-teal-700 hover:bg-teal-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecurityForm;
