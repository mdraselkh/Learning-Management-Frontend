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
import { ImBlocked, ImFilePdf } from "react-icons/im";
import { CiMail } from "react-icons/ci";
import { Modal } from "../../_components/Modal";
import axios from "axios";
import { showSuccessToast } from "@/app/utils/sweetAlert";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { generateReceiptPDF } from "@/app/utils/generateReceiptPdf";

// Define the shape of your data
const columnHelper = createColumnHelper();

export const columns = ({ updateTransactionList }) => [
  {
    accessorKey: "id",
    header: "SL No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "course_id",
    // header: "User",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { thumbnail, title, category_title } = row.original; // Access row data
      return (
        <div className="flex items-center space-x-3">
          <Image
            src={thumbnail || "/images/people.png"}
            alt={title}
            width={40}
            height={40}
            className="w-14 h-14 object-cover"
          />
          <div>
            <div className="font-medium text-gray-800">{title}</div>
            <div className="text-sm text-gray-500">{category_title}</div>
          </div>
        </div>
      );
    },
    sortingFn: (a, b) => a.original.title.localeCompare(b.original.title), // Sort by name
    filterFn: "includesString",
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
  accessorKey: "payment_method",
  header: "Payment Method",
  cell: ({ row }) => {
    const { payment_method } = row.original;
    return (
      <div>
        <span>{payment_method.toUpperCase()}</span>
      </div>
    );
  },
},

  {
    accessorKey: "payment_date",
    header: "Date",
    cell: ({ row }) => {
      const rawDate = row.original.payment_date;
      const formatted = format(new Date(rawDate), "do MMMM, yyyy"); // e.g. 21st March, 2025
      return <span>{formatted}</span>;
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
  {
  accessorKey: "invoice",
  header: "Invoice",
  cell: ({ row }) => {
    const payment = row.original;
    return (
      <button
        className=""
        onClick={() => generateReceiptPDF(payment)}
      >
        <ImFilePdf size={25}/>
      </button>
    );
  },
}

];
