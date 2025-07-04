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
import Image from "next/image";
import axiosInstance from "@/app/utils/axiosInstance";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useSelector } from "react-redux";

// Define the shape of your data
const columnHelper = createColumnHelper();

// export const columns = (updateEnrollList) => [
//   {
//     accessorKey: "id",
//     header: "SL No.",
//     cell: ({ row }) => row.index + 1,
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           User
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       const { image_url, name, email } = row.original;
//       return (
//         <div className="flex items-center space-x-3">
//           <Image
//             src={image_url || '/images/people.png'}
//             alt={name}
//             width={40}
//             height={40}
//             className="w-10 h-10 rounded-full border object-cover"
//           />
//           <div>
//             <div className="font-medium text-gray-800">{name}</div>
//             <div className="text-sm text-gray-500">{email}</div>
//           </div>
//         </div>
//       );
//     },
//     sortingFn: (a, b) => a.original.name.localeCompare(b.original.name),
//     filterFn: "includesString",
//   },
//   {
//     accessorKey: "phone",
//     header: "Phone",
//     filterFn: "includesString",
//   },
//   {
//     accessorKey: "title",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Course Title
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     sortingFn: (a, b) => a.original.title.localeCompare(b.original.title),
//     filterFn: "includesString",
//   },
//   {
//     accessorKey: "enrollment_date",
//     header: "Enrollment Date",
//     cell: ({ row }) => {
//       const date = new Date(row.original.enrollment_date);
//       return date.toLocaleDateString();
//     },
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const { status } = row.original;
//       return (
//         <span
//           className={`capitalize ${status === "pending" && "text-yellow-500"} ${
//             status === "canceled" && "text-red-500"
//           } ${status === "completed" && "text-teal-500"}`}
//         >
//           {status}
//         </span>
//       );
//     },
//   },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       const { id, userId } = row.original;
//       const router = useRouter();

//       const handleEdit = () => {
//         console.log("Edit clicked for id:", userId);
//         router.push(`/enroll-student/${userId}`);
//       };

//       const handleDelete = async () => {
//         try {
//           const response = await axiosInstance.delete(
//             `/api/enrollment/deleteEnrollment/${id}`
//           );
//           showSuccessToast("Enrollment data deleted successfully!");
//           updateEnrollList();
//           router.refresh();
//         } catch (error) {
//           showErrorToast(
//             `Failed to delete the enrollment data: ${error.message}`
//           );
//           console.error("Error deleting enrollment data:", error);
//         }
//       };

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={handleEdit}>
//               <CiEdit className="mr-2" />
//               Edit
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={handleDelete}>
//               <FiTrash className="mr-2" />
//               Delete
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
export const columns = (updateEnrollList,userRole) =>
  [
    {
      accessorKey: "id",
      header: "SL No.",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { image_url, name, email } = row.original.user;
        return (
          <div className="flex items-center space-x-3">
            <Image
              src={image_url || "/images/people.png"}
              alt={name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border object-cover"
            />
            <div>
              <div className="font-medium text-gray-800">{name}</div>
              <div className="text-sm text-gray-500">{email}</div>
            </div>
          </div>
        );
      },
      sortingFn: (a, b) =>
        a.original.user.name.localeCompare(b.original.user.name),
      filterFn: "includesString",
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.original.user.phone,
      filterFn: "includesString",
    },
    {
      accessorKey: "courses",
      header: "Courses",
      cell: ({ row }) => {
        const enrollments = row.original.enrollments || [];
        const courseTitles = enrollments.map(
          (en) => en.course?.title || "Untitled"
        );

        const shortList = courseTitles.slice(0, 3).join(", ");
        const extraCount =
          courseTitles.length > 3 ? ` +${courseTitles.length - 3} more` : "";

        return (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span className="cursor-default text-gray-700 text-sm max-w-[300px] truncate inline-block">
                {shortList}
                <span className="text-gray-500 italic">{extraCount}</span>
              </span>
            </Tooltip.Trigger>
            <Tooltip.Content
              side="top"
              className="z-50 bg-teal-100 border border-teal-300 max-w-60 text-black px-3 py-2 rounded text-xs shadow"
            >
              <ol className="list-decimal list-inside space-y-1">
                {courseTitles.map((title, index) => (
                  <li key={index}>{title}</li>
                ))}
              </ol>
            </Tooltip.Content>
          </Tooltip.Root>
        );
      },
    },

    {
      accessorKey: "total_courses",
      header: "Total Courses",
      cell: ({ row }) => row.original.total_courses,
      sortingFn: (a, b) => a.original.total_courses - b.original.total_courses,
    },
    {
      accessorKey: "latest_enroll_date",
      header: "Latest Enrolled",
      cell: ({ row }) => {
        const dates = row.original.enrollments.map(
          (e) => new Date(e.enrollment_date)
        );
        const latest = new Date(Math.max(...dates));
        return latest.toLocaleDateString();
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        // optional: show status of latest or overall status logic
        const lastStatus = row.original.enrollments[0]?.status;
        return (
          <span
            className={`capitalize ${
              lastStatus === "pending" && "text-yellow-500"
            } 
            ${lastStatus === "canceled" && "text-red-500"} 
            ${lastStatus === "completed" && "text-teal-500"}`}
          >
            {lastStatus || "N/A"}
          </span>
        );
      },
    },


    userRole === "admin"
      ? {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => {
            const { id } = row.original.user;
            const router = useRouter();

            const handleEdit = () => {
              router.push(`/enroll-student/${id}`);
            };

            const handleDelete = async () => {
              try {
                await axiosInstance.delete(
                  `/api/enrollment/deleteByUser/${id}`
                );
                showSuccessToast("User enrollments deleted successfully!");
                updateEnrollList();
                router.refresh();
              } catch (error) {
                showErrorToast(`Failed to delete data: ${error.message}`);
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
                  <DropdownMenuItem onClick={handleEdit}>
                    <CiEdit className="mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>
                    <FiTrash className="mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        }
      : null,
  ].filter(Boolean);
