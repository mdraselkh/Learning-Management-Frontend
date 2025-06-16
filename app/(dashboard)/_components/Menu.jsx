"use client";
import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import {
  MdOndemandVideo,
  MdOutlineOndemandVideo,
  MdOutlineRateReview,
  MdPayment,
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineWorkHistory } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { PiInvoiceThin } from "react-icons/pi";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { RiBloggerLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { BsQuestionSquare } from "react-icons/bs";

const Menu = () => {
  // State for managing dropdown for each menu
  const [dropdownOpen, setDropdownOpen] = useState({});
  const path = usePathname();
  console.log(path);
  const user = useSelector((state) => state.auth.user);

  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const adminMenu = [
    {
      label: "Dashboard",
      icon: <RxDashboard />,
      href: "/admin-dashboard",
    },
    {
      label: "Instructors",
      icon: <FaChalkboardUser />,
      href: "#",
      children: [
        { label: "Instructor List", href: "/instructor-list" },
        { label: "Create Instructor", href: "/create-user/instructor" },
      ],
    },
    {
      label: "Students",
      icon: <FaUserFriends />,
      href: "/student-list",
    },
    {
      label: "Courses",
      icon: <MdOndemandVideo />,
      href: "#",
      children: [
        { label: "Top Rated Courses", href: "/top-rated-courses" },
        { label: "Course Category List", href: "/category-list" },
        { label: "Course List", href: "/course-list" },
        { label: "Create Course", href: "/create-course" },
      ],
    },
    {
      label: "Enrollment",
      icon: <MdOutlineWorkHistory />,
      href: "#",
      children: [
        { label: "Enrollment history", href: "/enrollment-history" },
        { label: "Enroll a Student", href: "/enroll-student" },
      ],
    },
    {
      label: "Blog",
      icon: <RiBloggerLine />,
      href: "#",
      children: [
        { label: "Blogs List", href: "/blog-list" },
        { label: "Create Blogs", href: "/create-blog" },
      ],
    },

    {
      label: "Transactions",
      icon: <PiInvoiceThin />,
      href: "#",
      children: [{ label: "Transaction List", href: "/transactions" }],
    },
    {
      label: "Admin Profile",
      icon: <RiAdminLine />,
      href: "/profile",
    },
    {
      label: "Settings",
      icon: <IoSettingsSharp />,
      href: "/settings",
    },
  ];

  const instructorMenu = [
    {
      label: "Dashboard",
      icon: <RxDashboard />,
      href: "/instructor-dashboard",
    },
    {
      label: "My Courses",
      icon: <MdOndemandVideo />,
      href: "#",
      children: [
        { label: "Analytics", href: "/analytics" },
        // { label: "Top Rated Courses", href: "/top-rated-courses" },
        { label: "Course List", href: "/course-list" },
        { label: "Create Course", href: "/create-course" },
      ],
    },
    {
      label: "Blog",
      icon: <RiBloggerLine />,
      href: "#",
      children: [
        { label: "Blogs List", href: "/blog-list" },
        { label: "Create Blogs", href: "/create-blog" },
      ],
    },
    {
      label: "My Reviews",
      icon: <MdOutlineRateReview />,
      href: "/my-reviews",
    },
    {
      label: "Questions & Answer",
      icon: <BsQuestionSquare />,
      href: "/qa",
    },
    { label: "My Profile", icon: <RiAdminLine />, href: "/profile" },
    { label: "Settings", icon: <IoSettingsSharp />, href: "/settings" },
  ];

  const studentMenu = [
    { label: "Dashboard", icon: <RxDashboard />, href: "/student-dashboard" },
    {
      label: "My Courses",
      icon: <MdOutlineOndemandVideo />,
      href: "/my-courses",
    },
    // {
    //   label: "Assignments",
    //   icon: <MdAssignment />,
    //   href: "/assignments",
    // },
    // {
    //   label: "Certificates",
    //   icon: <FaCertificate />,
    //   href: "/certificates",
    // },
    {
      label: "Payments",
      icon: <MdPayment />,
      href: "/payment-history",
    },
    { label: "My Profile", icon: <RiAdminLine />, href: "/profile" },
    { label: "Settings", icon: <IoSettingsSharp />, href: "/settings" },
  ];

  function getMenuByRole(role) {
    switch (role) {
      case "admin":
        return adminMenu;
      case "instructor":
        return instructorMenu;
      case "student":
        return studentMenu;
      default:
        return [];
    }
  }

  const menuList = getMenuByRole(user?.role);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 overflow-y-auto">
      {menuList.map((menuItem, index) => (
        <div key={index} className="w-full">
          <div
            className={`flex items-center justify-between p-2 hover:bg-teal-100 hover:text-black ${
              path === menuItem.href ? "bg-teal-600 text-white" : "bg-white"
            }  rounded cursor-pointer`}
            onClick={() => toggleDropdown(index)}
          >
            <Link
              href={menuItem.href !== "#" ? menuItem.href : "#"}
              className="flex items-center gap-2"
            >
              <span className="text-base">{menuItem.icon}</span>
              <p className="block">{menuItem.label}</p>
            </Link>
            {menuItem.children ? (
              dropdownOpen[index] ? (
                <MdKeyboardArrowDown className="block" />
              ) : (
                <MdKeyboardArrowRight className="block" />
              )
            ) : null}
          </div>
          {menuItem.children && dropdownOpen[index] && (
            <ul className="pl-6 py-2  ml-2">
              {menuItem.children.map((child, childIndex) => (
                <li key={childIndex} className="py-1 list-disc">
                  <Link
                    href={child.href}
                    className={`block hover:bg-teal-100 hover:text-black ${
                      path === child.href
                        ? "bg-teal-600 text-white"
                        : "bg-white"
                    } px-2 py-1 text-sm text-gray-700`}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
