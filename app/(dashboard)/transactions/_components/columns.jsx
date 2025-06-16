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

// Define the shape of your data
const columnHelper = createColumnHelper();

export const columns = ({ updateTransactionList }) => [
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
      const { image_url, user_name, email } = row.original; // Access row data
      return (
        <div className="flex items-center space-x-3">
          <Image
            src={image_url || "/images/people.png"}
            alt={user_name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border border-gray-200 object-cover"
          />
          <div>
            <div className="font-medium text-gray-800">{user_name}</div>
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        </div>
      );
    },
    sortingFn: (a, b) =>
      a.original.user_name.localeCompare(b.original.user_name), // Sort by name
    filterFn: "includesString",
  },
  {
    accessorKey: "course_title",
    header: "Course Title",
  },
  {
    accessorKey: "amount",
    header: "Amount (TK)",
    cell: ({ row }) => {
      const usd = parseFloat(row.original.amount);
      const bdtRate = 110; // Set your conversion rate
      const bdt = usd * bdtRate;

      return (
        <div>
          <span className="text-gray-800 font-medium">৳ {bdt.toFixed(2)}</span>
          {/* <span className="text-xs text-gray-500">(USD ${usd.toFixed(2)})</span> */}
        </div>
      );
    },
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
              status === "pending" && "text-yellow-500"
            } ${status === "canceled" && "text-red-500"} ${
              status === "completed" && "text-teal-500"
            }`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
];
