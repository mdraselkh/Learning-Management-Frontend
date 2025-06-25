"use client";
import React, { useState } from "react";
import EditUserForm from "../_components/EditUserForm";
import { useSelector } from "react-redux";
import SecurityForm from "../_components/SecurityForm";

const Tabs = ["Edit Profile", "Security"];

const page = () => {
  const [activeTab, setActiveTab] = useState("Edit Profile");
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container   py-3">
      <h2 className="text-2xl md:text-4xl font-semibold ">Settings</h2>
      <div className="my-5 bg-gray-200 border border-gray-300 rounded-sm px-2 flex items-start  gap-4">
        {Tabs.map((tab, index) => (
          <button
            className={`py-3 px-3 text-lg font-semibold  ${
              activeTab === tab
                ? "border-teal-700 border-b-4 text-teal-700"
                : "border-none text-gray-500"
            } `}
            key={index}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "Edit Profile" && (
        <div>
          <EditUserForm user={user} />
          <div className="my-5 rounded-md bg-white border border-gray-200 p-4 flex items-start flex-col gap-4">
            <h2 className="text-xl font-bold">Delete Account</h2>
            <div>
              <h3 className="font-semibold">
                Are you sure you want to delete your account?
              </h3>
              <p className="text-gray-500">
                Refers to the action of permanently removing a user's account
                and associated data from a system, service and platform.
              </p>
            </div>
            <button className="px-3 py-2 rounded-l-full rounded-r-full text-white font-semibold bg-teal-700 hover:bg-teal-500">
                Delete Account
            </button>
          </div>
        </div>
      )}
      {activeTab==='Security' && (
        <SecurityForm/>
      )}
    </div>
  );
};

export default page;
