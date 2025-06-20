"use client";

import { loadUser } from "@/app/store/authSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import axiosInstance from "@/app/utils/axiosInstance";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");
  const [stats, setStats] = useState({
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/dashboard/dashboard-stats"
        );
        setStats(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  // Load user data on component mount
  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  console.log(user);

  // Fallback for user data
  const userName = user?.name || "User";
  const userEmail = user?.email || "example@example.com";
  const userImage = user?.image_url || "/images/people.png";
  const phone = user?.phone ;

  return (
    <div className="md:my-5 md:p-5 bg-white min-h-screen rounded-md flex flex-col md:flex-row">
      {/* Sidebar Section */}
      <div className="w-full md:w-1/4 border-r px-4">
        {/* User Profile */}
        <div className="flex items-center space-x-3 mb-5">
          <Image
            src={userImage}
            alt={userName}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border object-cover"
          />
          <div>
            <div className="font-medium text-gray-800">{userName}</div>
            <div className="text-sm text-gray-500">{userEmail}</div>
          </div>
        </div>

        {/* Account Balance */}
        {user?.role === "admin" && (
          <div className="border-t border-b py-3 mb-5">
            <h2 className="text-gray-700 font-semibold">Account Balance</h2>
            <span className="text-gray-500 text-lg">
              ৳{(stats?.totalRevenue * 110).toFixed(2)}
            </span>
          </div>
        )}

        {user?.role === "instructor" && (
          <div className="border-t border-b py-3 mb-5">
            <h2 className="text-gray-700 font-semibold">Earnings</h2>
            <span className="text-green-600 text-lg">
              ${user?.balance || "0.00"}
            </span>
          </div>
        )}

        {user?.role === "student" && (
          <div className="border-t border-b py-3 mb-5">
            <h2 className="text-gray-700 font-semibold">
              Welcome, Student! 🎓
            </h2>
            <p className="text-sm text-gray-500">
              Start learning new skills and track your enrolled courses here.
            </p>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-row md:flex-col gap-8 md:gap-0 space-y-2">
          <button
            className={`flex justify-between items-center px-5 py-3 md:p-3 rounded ${
              activeTab === "profile" ? "bg-gray-100 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Personal Information <MdOutlineKeyboardArrowRight />
          </button>
          <button
            className={`flex justify-between items-center px-5 py-3 md:p-3 rounded ${
              activeTab === "security" ? "bg-gray-100 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("security")}
          >
            Account Security <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full mt-4 md:mt-0 md:w-3/4 px-2 md:px-6">
        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                <p className="text-sm text-gray-500">
                  Basic info, like your name and address, that you use on this
                  platform.
                </p>
              </div>
              <Link href={`/create-user/${user?.role}/${user?.userId}`}>
                <FaRegEdit className="ml-4 md:ml-0 text-xl text-gray-600 cursor-pointer" />
              </Link>
            </div>

            {/* Example Content (Add More as Needed) */}
            <div className="">
              <div className="bg-gray-200 rounded px-4 py-2 flex items-center ">
                Basics
              </div>
              <div className="grid grid-cols-2 gap-1 md:gap-4 mt-5">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Full Name
                  </h3>
                  <p className="text-gray-800">{userName}</p>
                </div>
                <div>
                  <h3 className="text-sm text-wrap font-medium text-gray-600">Email</h3>
                  <p className="text-gray-800">{userEmail}</p>
                </div>
                {user?.address && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      Address
                    </h3>
                    <p className="text-gray-800">{user?.address}</p>
                  </div>
                )}
                {user?.city && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">City</h3>
                    <p className="text-gray-800">{user?.city}</p>
                  </div>
                )}
                {phone && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Phone</h3>
                    <p className="text-gray-800">{phone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Security Tab Content */}
        {activeTab === "security" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Security</h2>
            <p className="text-sm text-gray-500">
              Manage your password, two-factor authentication, and account
              activity.
            </p>
            {/* Example Content */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-600">Password</h3>
              <p className="text-gray-800">Last updated 3 months ago</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
