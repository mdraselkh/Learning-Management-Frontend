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

// Define the shape of your data
const columnHelper = createColumnHelper();

export const columns = (updateBlogList) => [
  {
    accessorKey: "id",
    header: "SL No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { title, image_url, content } = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Image
            src={image_url}
            alt={title}
            width={40}
            height={40}
            className="w-10 h-10 object-cover"
          />
          <div>
            <div className="font-medium text-gray-800 line-clamp-1">{title}</div>
            <div className="text-sm text-gray-500 line-clamp-1">{content}</div>
          </div>
        </div>
      );
    },
    sortingFn: (a, b) => a.original.title.localeCompare(b.original.title),
    filterFn: "includesString",
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (a, b) => a.original.category.localeCompare(b.original.category),
    filterFn: "includesString",
  },
  {
    accessorKey: "author_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (a, b) => a.original.author_name.localeCompare(b.original.author_name),
    filterFn: "includesString",
  },
  {
    accessorKey: "created_at",
    header: "Published",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
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
          className={`capitalize ${
            status === "pending" && "text-yellow-500"
          } ${status === "draft" && "text-gray-700"} ${
            status === "published" && "text-teal-500"
          }`}
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
      const { id } = row.original;
      const router = useRouter();

      const handleEdit = () => {
        console.log("Edit clicked for id:", id);
        router.push(`/create-blog/${id}`);
      };

      const handleDelete = async () => {
        try {
          const response = await axios.delete(
            `http://localhost:5000/api/blog/deleteBlog/${id}`
          );
          showSuccessToast("Blog deleted successfully!");
          updateBlogList();
          router.refresh();
        } catch (error) {
          showErrorToast(`Failed to delete the blog: ${error.message}`);
          console.error("Error deleting blog:", error);
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
