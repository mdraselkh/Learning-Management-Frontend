"use client";
import React, { useState } from "react";
import ContactBanner from "./ContactBanner";
import Image from "next/image";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import FaqSection from "./FaqSection";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Add your form submission logic here
  };



  return (
    <div>
      <ContactBanner />
      <div className="flex flex-col-reverse lg:flex-row container mx-auto max-w-7xl items-center justify-between lg:gap-32">
        <div className="flex flex-col items-start justify-between gap-8 pb-20 px-4 lg:w-1/2">
          <h3 className="texxt-black text-sm md:text-base uppercase">
            Contact Us
          </h3>
          <h1 className="font-bold text-3xl lg:text-5xl font-serif text-black">
            {" "}
            Are you interested in online learning? Contact us
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            We are here to help you with any questions or concerns you may have.
            Please feel free to reach out to us via email or phone.
          </p>
          <Image
            src="/images/signature.png"
            alt=""
            width={200}
            height={200}
            className="mt-5"
          />
          <span className="font-serif">
            <p>Md Rasel</p>
            <p>Director</p>
          </span>
        </div>
        <div className="relative z-10 -top-32 px-4 lg:w-1/2">
          <div className=" bg-white rounded shadow-md lg:px-16 lg:py-14 p-8 flex flex-col items-start justify-between">
            <div className="flex flex-col gap-4 w-full">
              <h2 className="font-semibold text-4xl font-serif text-black">
                Fill out for contact
              </h2>
              <p className="text-gray-500">
                {" "}
                Fill out the form below to contact us
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name *"
                    required
                    className="mt-5 p-4  w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email *"
                    required
                    className="mt-5 p-4  w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Subject */}
                <div>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="mt-5 p-4  w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message *"
                    required
                    rows="4"
                    className="mt-5 p-4  w-full border border-gray-400  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>

                {/* Save Information Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="saveInfo"
                    className="ml-2 text-base font-medium text-gray-600"
                  >
                    Save my information for future use
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className=" bg-teal-950  text-white py-4 px-10 rounded-md hover:scale-95"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl flex flex-col gap-10 items-center justify-center lg:justify-between pb-20 lg:pb-32 px-4 xl:px-0">
        <div className="flex flex-col items-center justify-center gap-4">
          <h3 className="text-black text-sm md:text-base uppercase">
            Contact Details
          </h3>
          <h1 className="font-bold text-4xl font-serif text-black">
            {" "}
            Find our location
          </h1>
        </div>
        <div className="flex max-w-96 sm:max-w-7xl w-full flex-col sm:flex-row gap-8 md:gap-0 items-start md:items-center justify-between">
          <div className="flex items-center md:items-start justify-center gap-5">
            <Image
              src="/images/home.png"
              alt=""
              className="w-10 h-10 object-cover "
              width={50}
              height={50}
            />
            <h2 className="flex flex-col items-start justify-center gap-2 text-base font-semibold">
              Area location{" "}
              <span className="text-gray-400 text-sm font-medium flex flex-wrap">
                Sector-7, Road-12, House-52,
                <br /> Uttara, Dhaka
              </span>
            </h2>
          </div>
          <div className=" md:px-10 lg:px-36  flex items-center md:items-start justify-center gap-5 md:border-r md:border-l border-gray-300">
            <Image
              src="/images/agenda.png"
              alt=""
              className="w-10 h-10 object-cover "
              width={50}
              height={50}
            />
            <h2 className="flex flex-col items-start justify-center gap-2 text-base font-semibold">
              Contact Details{" "}
              <span className="text-gray-400 text-sm font-medium">
                888-123-4567
                <br /> info@example.com
              </span>
            </h2>
          </div>
          <div className=" flex items-center md:items-start justify-center gap-5 ">
            <Image
              src="/images/time.png"
              alt=""
              className="w-10 h-10 object-cover "
              width={50}
              height={50}
            />
            <h2 className="flex flex-col items-start justify-center gap-2 text-base font-semibold">
              Opening Hours{" "}
              <span className="text-gray-400 text-sm font-medium">
                Monday-Friday
                <br /> 10:30a.m-7:00p.m
              </span>
            </h2>
          </div>
        </div>
      </div>
      <FaqSection/>
    </div>
  );
};

export default Contact;
