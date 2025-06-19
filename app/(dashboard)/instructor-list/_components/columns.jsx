"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ImBlocked } from "react-icons/im";
import { CiMail } from "react-icons/ci";
import { Modal } from "../../_components/Modal";
import axios from "axios";
import { showSuccessToast } from "@/app/utils/sweetAlert";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axiosInstance";

// Define the shape of your data
const columnHelper = createColumnHelper();


export const columns =({updateUsersList})=> [
  {
    accessorKey: "id",
    header: "SL No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "user",
    // header: "User",
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
      const { image_url, name, email } = row.original; // Access row data
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
    sortingFn: (a, b) => a.original.name.localeCompare(b.original.name), // Sort by name
    filterFn: "includesString",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <div>
          <span
            className={` capitalize ${
              status === "inactive" && "text-yellow-500"
            } ${status === "blocked" && "text-red-500"} ${
              status === "active" && "text-teal-500"
            }`}
          >
            {status}
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
      console.log(id);
      const router=useRouter();


      const handleEdit=(id)=>{
        console.log('update user id:',id);
        router.push(`/create-user/instructor/${id}`);
      }

      // Handle Delete Action
      const handleDelete = (id) => {
        console.log("Delete clicked for id:", id);

        axiosInstance
          .delete(`/api/users/deleteUser/${id}`)
          .then((response) => {
            console.log("User deleted successfully:", response.data);
            showSuccessToast("User deleted successfully");
            updateUsersList();
          })
          .catch((error) => {
            console.error("Error during deleting user:", error);
          });
      };
      const handleBlocked = (id) => {
        console.log("Blocked clicked for id:", id);

        axiosInstance
          .patch(`/api/users/blocked/${id}`)
          .then((response) => {
            console.log("User blocked successfully:", response.data);
            showSuccessToast("User blocked successfully");
            updateUsersList();
          })
          .catch((error) => {
            console.error("Error during blocked user:", error);
          });
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
            <DropdownMenuItem>
              <span className="mr-1">
                <CiMail />
              </span>
              Send Mail
            </DropdownMenuItem>
            {/* <DropdownMenuItem><span className="mr-1" onClick={handleEdit(id)}><CiEdit/></span>Edit</DropdownMenuItem> */}
            <DropdownMenuItem
              className="text-blue-700"
              onClick={() => handleEdit(id)}
            >
              <span>
                <AiOutlineEdit className="mr-1" />
              </span>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-700"
              onClick={() => handleDelete(id)}
            >
              <span>
                <AiOutlineDelete className="mr-1" />
              </span>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => handleBlocked(id)}>
              <span>
                <ImBlocked className="mr-1" />
              </span>
              Blocked
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
