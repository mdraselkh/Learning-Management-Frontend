"use client";
import { useDispatch } from "react-redux";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import { useEffect } from "react";
import { loadUser } from "../store/authSlice";
import useAuthProfile from "../hooks/useAuthProfile";
import Loading from "../loading";
// import dynamic from 'next/dynamic';
// const Navbar = dynamic(() => import('./_components/Navbar'), { ssr: false });

export default function HomeLayout({ children }) {
  const { loading } = useAuthProfile();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <main>{children}</main>
      <Footer />
    </div>
  );
}
