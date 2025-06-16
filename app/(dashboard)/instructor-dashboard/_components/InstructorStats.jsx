"use client";
import { FaBook, FaUsers, FaStar, FaMoneyBill, FaVideo } from "react-icons/fa";

const InstructorStats = () => {
   const stats = {
    totalCourses: 5,
    totalStudents: 320,
    avgRating: 4.6,
    totalLessons: 42,
    totalEarnings: 18500,
  };

  const items = [
    {
      label: "Courses",
      value: stats.totalCourses,
      icon: <FaBook className="text-blue-500" />,
    },
    {
      label: "Students",
      value: stats.totalStudents,
      icon: <FaUsers className="text-green-500" />,
    },
    
    {
      label: "Lessons",
      value: stats.totalLessons,
      icon: <FaVideo className="text-purple-500" />,
    },
    {
      label: "Earnings",
      value: `৳${stats.totalEarnings}`,
      icon: <FaMoneyBill className="text-emerald-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center text-center border"
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <h3 className="text-lg font-semibold">{item.label}</h3>
          <p className="text-xl font-bold text-gray-800">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default InstructorStats;
