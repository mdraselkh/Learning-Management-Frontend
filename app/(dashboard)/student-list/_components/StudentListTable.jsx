"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import Loading from "@/app/loading";
import axiosInstance from "@/app/utils/axiosInstance";

const StudentListTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to true

  const fetchUsersData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/api/users/getAllusers"
      );
      console.log(response.data.users);
      const filteredUsers = response.data.users.filter(
        (user) => user.role === "student"
      );
      setUsers(filteredUsers);
      console.log(filteredUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      // Ensure loading is set to false after the request
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const updateUsersList = () => {
    fetchUsersData();
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <div>
      <DataTable
        columns={columns({ updateUsersList: updateUsersList })}
        data={users}
      />
    </div>
  );
};

export default StudentListTable;
