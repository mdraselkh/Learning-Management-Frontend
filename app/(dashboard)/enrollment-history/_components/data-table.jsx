"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useSelector } from "react-redux";

export function DataTable({ columns, data, categories }) {
  console.log(data);
  const user = useSelector((state) => state.auth.user);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  console.log(globalFilter);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: {
      sorting,
      globalFilter,
      statusFilter,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const { name, phone, title } = row.original;

      if (!filterValue) return true; // No filter, show all rows

      const searchTerm = filterValue.toLowerCase();

      return (
        title.toLowerCase().includes(searchTerm) ||
        name.toLowerCase().includes(searchTerm) ||
        phone.toLowerCase().includes(searchTerm)
      );
    },
  });

  const filteredRows = table.getRowModel().rows.filter((row) => {
    const { status } = row.original;

    // Match status filter
    if (statusFilter) {
      return status.toLowerCase() === statusFilter.toLowerCase();
    }
    return true; // No status filter applied
  });

  console.log(data, columns);

  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <h3 className="text-3xl font-semibold">Enrollment History</h3>

        <div className="flex gap-5 items-center justify-end py-4 w-1/2">
          <Input
            type="text"
            placeholder="Search ..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="px-4 py-5 rounded-md  w-1/3 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
          />
          <Select
            onValueChange={(value) => {
              console.log("Status:", value);
              setStatusFilter(value);
            }}
          >
            <SelectTrigger className="w-[100px] focus:ring-1 focus:ring-yellow-500 focus:outline-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {user?.role === "admin" && (
            <Link href="/enroll-student">
              <Button className="flex items-center gap-2 bg-teal-950 border border-gray-400 text-white hover:scale-95 hover:bg-teal-900">
                <FaPlus /> Add
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {filteredRows.length ? (
              filteredRows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
