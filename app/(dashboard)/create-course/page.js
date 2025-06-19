'use client'
import React, { useEffect, useState } from 'react'
import CreateCourseForm from './_components/CreateCourseForm';
import axios from 'axios';
import axiosInstance from '@/app/utils/axiosInstance';

const page = () => {
    const [categories, setCategories] = useState([]);
    const [instructors, setInstructors] = useState([]);
  
    
    useEffect(() => {
      // Fetch categories from the API using Axios
      axiosInstance
        .get("/api/categories/getAllCategories") // Replace with your actual API endpoint
        .then((response) => {
           
              setCategories(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }, []);
  
    useEffect(() => {
      axiosInstance
        .get("/api/users/getAllusers")
        .then((response) => {
          const filteredUsers = response.data.users.filter(
            (user) => user.role === "instructor"
          );
         
          setInstructors(filteredUsers);
        })
        .catch((error) => {
          console.error("Error fetching instructors:", error);
        });
    }, []);

  return (
    <div>
        <CreateCourseForm categories={categories} instructors={instructors} />
    </div>
  )
}

export default page;

