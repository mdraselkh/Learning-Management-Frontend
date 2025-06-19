"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import axiosInstance from "@/app/utils/axiosInstance";

export default function HighestRatedCourses({ isDashbaord }) {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axiosInstance.get(
        "/api/courses/top-rated"
      );
      console.log(res);
      setCourses(res.data.data);
    };
    fetchCourses();
  }, []);

  console.log(courses);

  const paginatedCourses = isDashbaord
    ? courses.slice(0, 5)
    : courses.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="">
      <div className="flex items-center justify-between w-full text-2xl mt-8 mb-5">
        <h3 className="font-semibold">High Rated Courses</h3>
        {isDashbaord && (
          <Link
            href="/course-list"
            className="text-white hover:bg-teal-500 bg-teal-900 px-2 py-1 text-lg"
          >
            See all
          </Link>
        )}
      </div>

      <div className="overflow-x-auto  border rounded bg-white">
        <table className="min-w-full text-sm  text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b py-1">
              <th className="py-2 px-3 font-medium">Course</th>
              <th className="py-2 px-3 font-medium">Rating</th>
              <th className="py-2 px-3 font-medium">Enrolled</th>
              <th className="py-2 px-3 font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-3 flex items-center gap-3">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    width={45}
                    height={45}
                    className="rounded object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800 truncate max-w-[180px]">
                      {course.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Instructor{course.instructors.length > 1 ? "s" : ""} -{" "}
                      {course.instructors.map((inst) => inst.name).join(", ")}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-3">
                  {parseFloat(course.avg_rating) > 0
                    ? `${course.avg_rating} ⭐`
                    : "0.0"}
                </td>
                <td className="py-3 px-3">{course.enrolled_count}</td>
                <td className="py-3 px-3 font-semibold text-green-700">
                  ৳ {course.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isDashbaord && courses.length >= 10 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium">Page {page}</span>
            <button
              onClick={() =>
                setPage((prev) =>
                  prev < Math.ceil(courses.length / itemsPerPage)
                    ? prev + 1
                    : prev
                )
              }
              disabled={page >= Math.ceil(courses.length / itemsPerPage)}
              className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
