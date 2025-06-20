"use client";
import { userSchema, userSchemaLogin } from "@/app/_components/userSchema";
import { login } from "@/app/store/authSlice";
import axiosInstance from "@/app/utils/axiosInstance";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "@/app/utils/sweetAlert";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validateData = userSchemaLogin.parse(formData);

      const response = await axiosInstance.post(
        "/api/users/login",
        validateData
      );

      console.log("Login successful:", response.data);
      const { token } = response.data;
      console.log(token);

      dispatch(login(token));
      showSuccessToast("Login successful");
      resetHandler();

      const decodedUser = jwtDecode(token);
      console.log(decodedUser);

      if (decodedUser.role === "admin") {
        router.push("/admin-dashboard");
      } else if (decodedUser.role === "instructor") {
        router.push("/instructor-dashboard");
      } else if (decodedUser.role === "student") {
        router.push("/student-dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else if (error.response) {
        if (error.response.status === 404) {
          console.error("Endpoint not found", error.response.data);
          showInfoToast("API endpoint not found. Please check the server.");
        } else {
          showErrorToast("Invalid email and password. Please try again.");
        }
      } else {
        console.error("Unexpected error:", error);
        showErrorToast("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetHandler = () => {
    setFormData({ email: "", password: "" });
  };

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

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
        <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center gap-5 px-8 xl:px-0">
          <div className="flex flex-col items-center gap-4  w-full">
            <h2 className="font-bold text-2xl md:text-5xl font-serif text-white">Log in</h2>
            <p className="text-white text-sm md:text-base mb-2 text-center">
              {" "}
              More than 50k students have joined Learncraft already
            </p>
            <form
              onSubmit={handleSubmit}
              className=" space-y-5 sm:space-y-8 bg-teal-950 rounded p-8 sm:p-10 w-auto xl:w-[38%]"
            >
              {/* Email */}
              <div>
                <label htmlFor="Email" className="text-white font-semibold">
                  Email Address
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email *"
                  // required
                  className="p-3 sm:p-4 mt-2 w-full  bg-teal-900 text-white  rounded-md shadow-sm outline-none"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="Password" className="text-white font-semibold">
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password *"
                  // required
                  className="p-3 sm:p-4 my-2 bg-teal-900 outline-none text-white  w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className=" bg-yellow-500 w-full font-semibold text-black py-3 sm:py-4 px-10 rounded-md hover:scale-95 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    Logging In...
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </span>
                ) : (
                  "Log In"
                )}
              </button>
              <div className="flex justify-between items-center font-semibold">
                <p className="text-gray-400">Don't have an account?</p>
                <Link
                  href="/sign-up"
                  className="text-gray-400 hover:text-yellow-500 hover:scale-105 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </form>
            <div className="flex items-center justify-between w-3/4 md:w-[40%] gap-2 mt-2">
              <div className="text-gray-400 border border-gray-600 w-full"></div>
              <p className="text-gray-200 text-lg px-2 font-extralight">or</p>
              <div className="text-gray-400 border border-gray-600 w-full"></div>

              <hr />
            </div>
            <div className="flex gap-6 sm:gap-10 justify-center w-3/4 md:w-[40%]">
              <button className="flex items-center justify-center  px-8 py-3 sm:px-10 sm:py-4 bg-teal-900 rounded text-white font-semibold hover:scale-95 transition-all duration-300">
                <Image
                  src="/images/google.png"
                  alt=""
                  width={30}
                  height={20}
                  className="mr-2 sm:mr-5"
                />
                Google
              </button>
              <button className="flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4  bg-teal-900 rounded text-white  font-semibold hover:scale-95 transition-all duration-300">
                <Image
                  src="/images/communication.png"
                  alt=""
                  width={30}
                  height={20}
                  className="mr-2 sm:mr-5"
                />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
