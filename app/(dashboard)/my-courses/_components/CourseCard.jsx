import Image from "next/image";
import React from "react";

export default function CourseCard({ course, onStartLearning }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition ">
      
      <div className="w-full h-52">
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{course.title}</h3>
        <div className="text-sm text-gray-500 mb-2">
          {course.completed_sections} of {course.total_sections} sections
          completed
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
          <div
            className="bg-teal-800 h-2.5 rounded-full"
            style={{ width: `${course.progress_percent}%` }}
          />
        </div>
        <div className="text-right">
          <button
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-900"
            onClick={() => onStartLearning(course)}
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}
