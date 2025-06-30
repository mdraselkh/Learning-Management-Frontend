"use client";

import React, { useEffect, useState } from "react";
import TeamBanner from "./TeamBanner";
import TeamCard from "./TeamCard";
import axios from "axios";
import axiosInstance from "@/app/utils/axiosInstance";
import Loading from "@/app/loading";

const TeamPage = () => {
  const [teamMember, setTeamMember] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/users/getAllusers");
        if (response.data) {
          const instructors = response.data.users.filter(
            (user) => user.role === "instructor"
          );
          setTeamMember(instructors);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

    if (loading) {
    return (
      <div className="min-h-screen bg-teal-500 flex items-center justify-center">
        <Loading />
      </div>
    );
  }



  return (
    <div>
      <TeamBanner />
      <div className="container mx-auto max-w-7xl py-10 md:py-20 flex flex-col items-center justify-between gap-6 px-4 xl:px-0">
        <div className="flex flex-col items-center justify-center gap-5 max-w-2xl">
          <h2 className="mb-2 text-black text-sm md:text-base uppercase">
            Contact Us
          </h2>
          <h1 className="text-2xl md:text-4xl font-semibold text-center text-black">
            Know our expert team agents, they solve your questions
          </h1>
          <p className="text-xs md:text-sm text-gray-400 text-center max-w-2xl">
            Discover the future of education with expertly designed courses that
            empower you to learn, grow, and thrive — anytime, anywhere.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10">
          {teamMember.map((item) => (
            <div key={item.id}>
              <TeamCard name={item.name} image={item.image_url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
