"use client";
import { useEffect, useState } from "react";
import Navbar from "./_components/Navbar";
import SideBar from "./_components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../store/authSlice";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [menuShow, setMenuShow] = useState(false);
  const [isAboveXl, setIsAboveXl] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };
  const pathname = usePathname();

  useEffect(() => {
    setMenuShow(false);
  }, [pathname]);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  console.log(isAboveXl);

  // Check screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsAboveXl(window.innerWidth >= 1280);
      if (window.innerWidth >= 1280) {
        setMenuShow(true); // Ensure sidebar is always visible above `xl`.
      } else {
        setMenuShow(false); // Auto-hide sidebar below `xl`.
      }
    };

    handleResize(); // Initialize state on mount.
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle sidebar visibility
  const toggleMenuShow = () => {
    if (!isAboveXl) {
      setMenuShow((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div
        className={`w-[300px] h-screen transition-transform duration-300 bg-white fixed left-0 top-0 z-50
         ${
           menuShow || isAboveXl
             ? "translate-x-0 w-[300px]"
             : "-translate-x-full"
         } 
         `}
      >
        <SideBar
          toggleMenuShow={toggleMenuShow}
          menuShow={menuShow}
          handleLogout={handleLogout}
        />
      </div>

      {!isAboveXl && menuShow && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenuShow}
        ></div>
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isAboveXl ? "ml-[300px] flex-1" : "w-full"
        }`}
      >
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-10 bg-white shadow">
          <Navbar
            toggleMenuShow={toggleMenuShow}
            menuShow={menuShow}
            user={user}
            handleLogout={handleLogout}
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4">{children}</div>
      </div>
    </div>
  );
}
