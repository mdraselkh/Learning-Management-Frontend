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

// Define the shape of your data
const columnHelper = createColumnHelper();

export const columns = (updateEnrollList) => [
  {
    accessorKey: "id",
    header: "SL No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { image_url, name, email } = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Image
            src={image_url}
            alt={name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-800">{name}</div>
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        </div>
      );
    },
    sortingFn: (a, b) => a.original.name.localeCompare(b.original.name),
    filterFn: "includesString",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    filterFn: "includesString",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (a, b) => a.original.title.localeCompare(b.original.title),
    filterFn: "includesString",
  },
  {
    accessorKey: "enrollment_date",
    header: "Enrollment Date",
    cell: ({ row }) => {
      const date = new Date(row.original.enrollment_date);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <span
          className={`capitalize ${status === "pending" && "text-yellow-500"} ${
            status === "canceled" && "text-red-500"
          } ${status === "completed" && "text-teal-500"}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { id, userId } = row.original;
      const router = useRouter();

      const handleEdit = () => {
        console.log("Edit clicked for id:", userId);
        router.push(`/enroll-student/${userId}`);
      };

      const handleDelete = async () => {
        try {
          const response = await axiosInstance.delete(
            `/api/enrollment/deleteEnrollment/${id}`
          );
          showSuccessToast("Enrollment data deleted successfully!");
          updateEnrollList();
          router.refresh();
        } catch (error) {
          showErrorToast(
            `Failed to delete the enrollment data: ${error.message}`
          );
          console.error("Error deleting enrollment data:", error);
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
  },
];
