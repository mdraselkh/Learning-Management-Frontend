"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import { userSchema, userSchemaRegister } from "@/app/_components/userSchema";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axiosInstance";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    // saveInfo: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router=useRouter();

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
      const validateData = userSchemaRegister.parse(formData);

      const response = await axiosInstance.post(
        "/api/users/register",
        validateData
      );

      console.log("Registration successful:", response.data);
      showSuccessToast("Registration successful");
      router.push('/login');
      resetHandler();
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
          showErrorToast("API endpoint not found. Please check the server.");
        } else if (
          error.response.data.message === "Email is already registered"
        ) {
          setErrors({ email: "Email is already registered" });
        } else {
          console.error("Error during registration:", error);
          showErrorToast("Something went wrong");
        }
      } else {
        console.error("Unexpected error:", error);
        showErrorToast("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetHandler = () => {
    setFormData({ name: "", email: "", password: "" });
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

      <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center z-10">
        <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center gap-5 px-8 xl:px-0">
          <div className="flex flex-col items-center gap-4  w-full">
            <h2 className="font-bold text-2xl md:text-5xl font-serif text-white">
              Sign up
            </h2>
            <p className="text-white md:text-base text-sm mb-2">
              {" "}
              More than 50k students join with us!
            </p>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 sm:space-y-8 bg-teal-950 rounded p-8 sm:p-10 w-auto xl:w-[38%]"
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
                  placeholder=""
                  // required
                  className="p-3 sm:p-4 mt-2 w-full  bg-teal-900 text-white  rounded-md shadow-sm outline-none"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              {/* Name */}
              <div>
                <label htmlFor="Name" className="text-white font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=""
                  // required
                  className="p-3 sm:p-4 mt-2 w-full  bg-teal-900 text-white  rounded-md shadow-sm outline-none"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
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
                  placeholder=""
                  // required
                  className="p-3 sm:p-4 my-2 bg-teal-900 outline-none text-white  w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              {/* Save Information Checkbox */}
              {/* <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="saveInfo"
                    className="ml-2 text-base font-medium text-gray-400"
                  >
                   By creating an account, I agree to this website's <Link href='#' className="text-white hover:text-yellow-500">privacy policy</Link> and <Link href='#' className="text-white hover:text-yellow-500">terms of service</Link>
                  </label>
                </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                className=" bg-yellow-500 w-full font-semibold text-black py-3 sm:py-4 px-10 rounded-md hover:scale-95 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    Signing Up...
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
              <div className="flex justify-between items-center font-semibold">
                <p className="text-gray-400">Already have an account?</p>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-yellow-500 hover:scale-105 transition-all duration-300"
                >
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
