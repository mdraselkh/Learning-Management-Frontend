import React from "react";
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";

const Pagination = ({ currentPage, totalPages, onPageChange, isCoursePage }) => {
  return (
    <div className={`flex gap-4 items-center justify-center ${isCoursePage? 'mt-10':'mt-0'}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className=" text-black hover:text-yellow-500 rounded disabled:hidden flex items-center"
      >
        <HiOutlineArrowLongLeft className="mr-2"/> Prev
      </button>
      <span className="text-sm font-medium text-gray-800">
        <span className="text-yellow-500">{currentPage}</span> / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-black hover:text-yellow-500 rounded disabled:hidden flex items-center"
      >
        Next <HiOutlineArrowLongRight className="ml-2"/>
      </button>
    </div>
  );
};

export default Pagination;
