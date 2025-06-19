"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Delete from "@/app/_components/Delete";
import { FiTrash } from "react-icons/fi";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import axios from "axios";
import { IoAnalyticsOutline } from "react-icons/io5";
import Image from "next/image";
import axiosInstance from "@/app/utils/axiosInstance";

// Define the shape of your data
// const columnHelper = createColumnHelper();

export const columns = (categories, updateCourseList, role) => {
  const columnHelper = createColumnHelper();

  const baseColumns = [
    {
      accessorKey: "id",
      header: "SL No.",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Course Title <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { title, thumbnail } = row.original;
        return (
          <div className="flex items-start gap-2">
            <Image
              src={thumbnail}
              alt={title}
              width={45}
              height={45}
              className="rounded object-cover"
            />
            <p className="font-medium text-gray-800 max-w-[180px]">
              {title}
            </p>
          </div>
        );
      },
      sortingFn: (a, b) => a.original.title.localeCompare(b.original.title),
      filterFn: "includesString",
    },
    {
      accessorKey: "category_id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Category Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { category_id } = row.original;
        const category = categories.find((cat) => cat.id === category_id);
        return <span>{category?.category_title || "Unknown"}</span>;
      },
      sortingFn: (a, b) => {
        const titleA =
          categories.find((cat) => cat.id === a.original.category_id)
            ?.category_title || "";
        const titleB =
          categories.find((cat) => cat.id === b.original.category_id)
            ?.category_title || "";
        return titleA.localeCompare(titleB);
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "total_lesson",
      header: "Total Lesson",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "enrolled_count",
      header: "Enrolled",
    },
    {
      accessorKey: "is_published",
      header: "Status",
      cell: ({ row }) => {
        const { is_published } = row.original;
        return (
          <div>
            <span
              className={`capitalize ${
                is_published
                  ? "text-yellow-500 bg-yellow-100 font-semibold px-2 py-1 rounded-md"
                  : "text-gray-900 bg-gray-400 px-2 py-1 rounded-md font-semibold"
              }`}
            >
              {is_published ? "Published" : "Draft"}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const { id } = row.original;
        const router = useRouter();

        const handleAnalytics = () => {
          router.push(`/courses/${id}/basic`);
        };
        const handleEdit = () => {
          router.push(`/courses/${id}/basic`);
        };
        const handleDelete = async (id) => {
          try {
            await axiosInstance.delete(
              `/api/courses/deleteCourses/${id}`
            );
            showSuccessToast("Course deleted successfully!");
            updateCourseList();
            router.push("/course-list");
            router.refresh();
          } catch (error) {
            showErrorToast(`Failed to delete the course: ${error.message}`);
          }
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleAnalytics}
                className="cursor-pointer"
              >
                <IoAnalyticsOutline className="mr-2" />
                See Analytics
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                <CiEdit className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(id)}
                className="cursor-pointer"
              >
                <FiTrash className="h-4 w-4 text-black mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Add Instructor Name column only if NOT instructor
  if (role !== "instructor") {
    baseColumns.splice(3, 0, {
      accessorKey: "instructor",
      header: "Instructor Name",
      cell: ({ row }) => {
        const { instructor } = row.original;
        return Array.isArray(instructor)
          ? instructor.map((inst) => inst.name).join(", ")
          : "No Instructors";
      },
    });
  }

  // Add Ratings column only if NOT admin
  if (role !== "admin") {
    baseColumns.splice(baseColumns.length - 2, 0, {
      accessorKey: "avg_rating",
      header: "Ratings",
      cell: ({ row }) => {
        const { avg_rating } = row.original;
        return (
          <div>{parseFloat(avg_rating) > 0 ? `${avg_rating} ⭐` : "0.0"}</div>
        );
      },
    });
  }

  return baseColumns;
};

