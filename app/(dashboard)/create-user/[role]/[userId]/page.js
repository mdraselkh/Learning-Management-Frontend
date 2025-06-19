"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/loading";
import EditUserForm from "@/app/(dashboard)/_components/EditUserForm";
import axiosInstance from "@/app/utils/axiosInstance";

const Page = ({ params }) => {
  const unwrappedParams = use(params);
  const { userId } = unwrappedParams;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("userId:", userId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/users/getUser/${userId}`
        );
        console.log("Fetched user:", response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData(); // make sure userId exists
  }, [userId]);

  if (loading) return <Loading />;

  return (
    <div>
      <EditUserForm user={user} />
    </div>
  );
};

export default Page;
