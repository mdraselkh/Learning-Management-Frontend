"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon, ChevronDown, ChevronUp } from "lucide-react";
import { HiShoppingBag } from "react-icons/hi2";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { TbMenu } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import CartSideBar from "./CartSideBar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { clearAllAccess } from "@/app/store/courseAccessSlice";
import { clearAccessStorage } from "@/app/utils/accessStorage";

const Navbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hover, setHover] = useState(false);
  const [activeTab, setActiveTab] = useState("free");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/courses/getAllCourses"
      );
      console.log(response.data?.data);

      setCourses(response.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  // if (loading) return <p>Loading courses...</p>;

  const cartCount = useSelector((state) => state.cart.totalItems);
  console.log(cartCount);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    dispatch(clearAllAccess());
    clearAccessStorage();
    router.push("/login");
    // router.refresh();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(courses);

  const MenuList = [
    { id: 1, name: "Home", link: "/" },
    {
      id: 2,
      name: "Courses",
      children: [
        {
          id: 21,
          name: "Free Courses",
          categoryName: ["finance", "design", "management", "developement"],
        },
        {
          id: 22,
          name: "Paid Courses",
          categoryName: ["finance", "design", "management", "developement"],
        },
      ],
    },
    {
      id: 3,
      name: "Pages",
      children: [
        { id: 31, name: "About", link: "/about" },
        { id: 32, name: "Course", link: "/course" },
        { id: 33, name: "Pricing", link: "/pricing" },
        { id: 34, name: "FAQ", link: "/faq" },
        { id: 35, name: "Career", link: "/career" },
        { id: 36, name: "Team", link: "/team" },
      ],
    },
    { id: 4, name: "Blog", link: "/blog" },
    { id: 5, name: "Contact", link: "/contact" },
  ];

  const freeCourses = courses.filter((course) => course.access_type === "free");
  const paidCourses = courses.filter((course) => course.access_type === "paid");

  console.log(freeCourses, paidCourses);

  const groupByCategory = (courseList) => {
    return courseList.reduce((acc, course) => {
      const cat = course.category_title.toLowerCase();
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(course);
      return acc;
    }, {});
  };

  const freeByCategory = groupByCategory(freeCourses);
  const paidByCategory = groupByCategory(paidCourses);

  console.log(freeByCategory, paidByCategory);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-20 transition duration-300 ${
          isScrolled ? "bg-teal-950" : "bg-transparent"
        }`}
      >
        {/* Top Bar */}
        <div className="hidden px-4 md:block">
          <div className="max-w-7xl container mx-auto flex justify-between items-center py-2 text-gray-300">
            <h2 className="text-sm font-sans mt-1">
              Are you interested in online coaching?{" "}
              <Link href="/contact" className="cursor-pointer text-md">
                Contact us.
              </Link>
            </h2>
            <div className="flex justify-between text-sm items-center gap-10 font-sans">
              <h2>support@example.com</h2>
              <h2>Call: (888) 123 4567</h2>
            </div>
          </div>
        </div>
        {/* Main Navbar */}
        <div className="border-t border-gray-500"></div>
        <div className="flex justify-between items-center max-w-7xl container mx-auto px-4  text-white">
          {/* Logo */}
          <Link
            href="/"
            className="text-white text-xl md:text-2xl py-4 cursor-pointer font-medium rounded-full flex items-center justify-center font-sans"
          >
            <span className="text-teal-950 text-2xl md:text-3xl font-semibold rounded-full flex items-center justify-center w-8 h-8 bg-yellow-500 font-pacifico">
              l
            </span>
            earnCraft
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="flex items-center">
              <ul className="flex items-center gap-8 xl:gap-12 ">
                {MenuList.map((menuItem) => (
                  <div
                    key={menuItem.id}
                    className="relative"
                    onMouseEnter={() => setHoveredMenu(menuItem.id)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    {/* Main Menu Item */}
                    <div className="flex items-center cursor-pointer font-medium font-sans">
                      <Link
                        href={menuItem.link || "#"}
                        className="hover:text-yellow-500 py-5"
                      >
                        {menuItem.name}
                      </Link>
                      {menuItem.children && (
                        <span className="ml-2">
                          {hoveredMenu === menuItem.id ? (
                            <ChevronUp size={20} className="text-gray-300" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-300" />
                          )}
                        </span>
                      )}
                    </div>

                    {/* Submenu */}
                    {menuItem.children && hoveredMenu === menuItem.id && (
                      <>
                        {menuItem.name === "Courses" && (
                          <div className="absolute top-[64px] -left-64 bg-white border-b-4 border-yellow-500 text-gray-900 shadow-md rounded-md w-[850px] font-sans text-sm">
                            <div className="flex gap-4">
                              <div className="flex flex-col bg-teal-50 p-5 shadow">
                                <button
                                  className={`px-5 py-4 w-52    ${
                                    activeTab === "free"
                                      ? "bg-white font-bold rounded-md shadow-sm"
                                      : ""
                                  }`}
                                  onClick={() => setActiveTab("free")}
                                >
                                  <p className="flex flex-col items-start text-left mt-1 font-serif text-black font-medium">
                                    Free Courses
                                    <span className="mt-3 text-gray-600">
                                      Free learning resources for skill
                                      development.
                                    </span>
                                  </p>
                                </button>
                                <button
                                  className={`px-5 py-4 w-52  ${
                                    activeTab === "paid"
                                      ? "bg-white font-bold rounded-md shadow-sm"
                                      : ""
                                  }`}
                                  onClick={() => setActiveTab("paid")}
                                >
                                  <p className="flex flex-col items-start font-serif text-left mt-1 text-black font-medium">
                                    Paid Courses
                                    <span className="mt-3 text-gray-600">
                                      Courses are available upon
                                      purchase.(Requires login)
                                    </span>
                                  </p>
                                </button>
                              </div>
                              {/* Tab Content */}
                              <div className="px-8 py-10">
                                {activeTab === "free" && (
                                  <div className="flex flex-col items-center justify-center font-serif">
                                    <div className="grid grid-cols-2 gap-10">
                                      {Object.entries(freeByCategory).map(
                                        ([category, courseList]) => (
                                          <div
                                            key={category}
                                            className="flex flex-col items-start font-semibold text-black cursor-pointer"
                                          >
                                            <Link
                                              href={`/category/${category}`}
                                            >
                                              {category.toUpperCase()}
                                            </Link>
                                            {courseList.map((course) => (
                                              <Link
                                                key={course.id}
                                                href={`/category/${category}/${course.title
                                                  .toLowerCase()
                                                  .replace(/\s+/g, "-")}`}
                                                className="mt-3 font-normal text-gray-600 hover:text-yellow-500 hover:font-light"
                                              >
                                                {course.title}
                                              </Link>
                                            ))}
                                          </div>
                                        )
                                      )}
                                    </div>
                                    <div className="bg-teal-50 rounded-md shadow p-4 mt-10 flex items-center gap-10">
                                      <div className="flex items-center justify-between gap-8">
                                        <Image
                                          src="/images/moneybag.png"
                                          alt="money-bag"
                                          width={40}
                                          height={40}
                                          className="w-10 h-10 object-cover"
                                        />
                                        <p className="flex flex-col items-start gap-2 mb-2">
                                          Increase your potential earnings
                                          <span className="text-gray-600">
                                            Unlock new skills and boost your
                                            career with courses designed to
                                            level you up.
                                          </span>
                                        </p>
                                      </div>
                                      <Link
                                        href="/career"
                                        className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md"
                                      >
                                        <FaArrowRightLong />
                                      </Link>
                                    </div>
                                  </div>
                                )}
                                {activeTab === "paid" && (
                                  <div className="flex flex-col items-center justify-center font-serif">
                                    <div className="grid grid-cols-2 gap-16">
                                      {Object.entries(paidByCategory).map(
                                        ([category, courseList]) => (
                                          <div
                                            key={category}
                                            className="flex flex-col items-start font-semibold text-black cursor-pointer"
                                          >
                                            <Link
                                              href={`/category/${category}`}
                                            >
                                              {category.toUpperCase()}
                                            </Link>
                                            {courseList.map((course) => (
                                              <Link
                                                key={course.id}
                                                href={`/category/${category}/${course.title
                                                  .toLowerCase()
                                                  .replace(/\s+/g, "-")}`}
                                                className="mt-3 font-normal text-gray-600 hover:text-yellow-500 hover:font-light"
                                              >
                                                {course.title}
                                              </Link>
                                            ))}
                                          </div>
                                        )
                                      )}
                                    </div>
                                    <div className="bg-teal-50 rounded-md shadow p-4 mt-10 flex items-center gap-10">
                                      <div className="flex items-center justify-between gap-8">
                                        <Image
                                          src="/images/moneybag.png"
                                          alt="money-bag"
                                          width={40}
                                          height={40}
                                          className="w-10 h-10 object-cover"
                                        />
                                        <p className="flex flex-col items-start gap-2 mb-2">
                                          Increase your potential earnings
                                          <span className="text-gray-600">
                                            Unlock new skills and boost your
                                            career with courses designed to
                                            level you up.
                                          </span>
                                        </p>
                                      </div>
                                      <Link
                                        href="/career"
                                        className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md"
                                      >
                                        <FaArrowRightLong />
                                      </Link>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        {menuItem.name === "Pages" && (
                          <div className="absolute top-[64px] -left-8 bg-white border-b-4 border-yellow-500 text-gray-900 shadow-md rounded-md w-36 px-8 py-3 font-sans text-sm">
                            {menuItem.children.map((child) => (
                              <Link
                                key={child.id}
                                href={child.link}
                                className="block px-4 py-2 hover:text-yellow-500 hover:font-extralight hover:ml-1 transition-all duration-300 ease-in-out"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-10 py-4">
            {/* Cart */}
            <button
              className="relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <HiShoppingBag className=" text-2xl md:text-3xl " />
              <span className="absolute top-1 md:top-2 -right-1 px-1 py-0 rounded-full bg-yellow-400 text-gray-800 text-xs">
                {cartCount}
              </span>
            </button>
            {/* Auth Links */}
            {user && user.role === "student" ? (
              <div
                className="relative"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {/* Avatar */}
                <div className=" lg:w-12 lg:h-12 p-1 lg:mb-3 rounded-full bg-white flex items-center justify-center cursor-pointer">
                  {/* You can use an image or icon here */}
                  <Image
                    src={user?.image_url || "/images/people.png"}
                    alt="User Avatar"
                    width={20}
                    height={20}
                    className=" lg:w-[32px] lg:h-[32px] object-cover"
                  />
                </div>

                {/* Dropdown for Dashboard, Profile, Logout */}
                {hover && (
                  <div className="absolute top-[60px] p-4 right-0 bg-white border-b-4 border-yellow-500 text-gray-900 shadow-md rounded-md font-sans text-sm w-48 transition-all duration-500">
                    <Link
                      href={
                        user?.role === "admin"
                          ? "/admin-dashbaord"
                          : user?.role === "instructor"
                          ? "/instructor-dashboard"
                          : "/student-dashboard"
                      }
                    >
                      <p className="block px-4 py-2 hover:text-yellow-500 hover:font-extralight hover:ml-2 transition-all duration-300 ease-in-out">
                        My Dashboard
                      </p>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:text-yellow-500 hover:font-extralight hover:ml-2 transition-all duration-300 ease-in-out"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:block font-medium font-sans">
                <Link href="/login">
                  <span>Login</span>
                </Link>
                <span className="px-3">|</span>
                <Link href="/sign-up">
                  <span>Register</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Icon */}
            <button
              className="lg:hidden text-white text-2xl transition-transform  duration-500 "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <CgClose /> : <TbMenu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white text-black h-screen font-sans transition-all duration-1000 ease-linear">
            <ul className="flex flex-col items-start py-2">
              {MenuList.map((menuItem) => (
                <li key={menuItem.id} className=" py-4 w-full">
                  <button
                    className="flex justify-between items-center w-full text-base hover:text-yellow-500"
                    onClick={() =>
                      setDropdownOpen((prev) => ({
                        ...prev,
                        [menuItem.id]: !prev[menuItem.id],
                      }))
                    }
                  >
                    <span className="px-4">{menuItem.name}</span>
                    {menuItem.children && (
                      <span className="mr-2 text-lg transition-transform duration-300">
                        {dropdownOpen[menuItem.id] ? (
                          <span>
                            <ChevronUp size={20} className="text-gray-800" />
                          </span> // Up arrow
                        ) : (
                          <span>
                            <ChevronDown size={20} className="text-gray-800" />
                          </span> // Down arrow
                        )}
                      </span>
                    )}
                  </button>
                  {menuItem.children && dropdownOpen[menuItem.id] && (
                    <div className="flex flex-col mt-2">
                      {menuItem.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.link}
                          className="py-2 text-sm hover:text-yellow-500 first:border-t first:border-gray-300 last:border-b last:border-yellow-500"
                        >
                          <span className="pl-5 ml-5">{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      {<CartSideBar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}
    </>
  );
};

export default Navbar;
