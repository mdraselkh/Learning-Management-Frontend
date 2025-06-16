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
import { Modal } from "../../_components/Modal";
import { CategoryForm } from "./CategoryForm";
import { showSuccessToast } from "@/app/utils/sweetAlert";
import axios from "axios";

export function DataTable({ columns, data, updateCategoriesList }) {
  const [sorting, setSorting] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCreateCategory = (category) => {
    console.log("New Category:", category);

    axios
      .post("http://localhost:5000/api/categories/createCategories", category)
      .then((response) => {
        console.log("Category created successfully:", response.data);
        showSuccessToast("Category created successfully");
        setIsModalOpen(false); // Close the modal after success
        updateCategoriesList();
      })
      .catch((error) => {
        console.error("Error during create category:", error);
      });

    setIsModalOpen(false);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      categoryFilter,
    },
  });

  const filteredRows = table.getRowModel().rows.filter((row) => {
    const { category_title } = row.original;

    // Match status filter
    if (categoryFilter) {
      return category_title.toLowerCase() === categoryFilter.toLowerCase();
    }
    return true; // No status filter applied
  });

  return (
    <>
      <div>
        <div className="flex items-center justify-between py-5">
          <h3 className="text-3xl font-semibold">Category List</h3>

          <div className="flex gap-5 items-center justify-end py-4 w-1/2">
            <Select
              onValueChange={(value) => {
                console.log("Status:", value);
                setCategoryFilter(value);
              }}
            >
              <SelectTrigger className="w-[180px] focus:ring-1 focus:ring-yellow-500 focus:outline-none">
                <SelectValue placeholder="Filtered by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="development">Web Development</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="design">Web Design</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              className="flex items-center gap-2 bg-teal-950 border border-gray-400 text-white hover:scale-95 hover:bg-teal-900"
              onClick={handleModalToggle}
            >
              <FaPlus /> Add
            </Button>
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

      {/* Reusable Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        title="Create Category"
      >
        <CategoryForm
          onSubmit={handleCreateCategory}
          onCancel={handleModalToggle}
        />
      </Modal>
    </>
  );
}
