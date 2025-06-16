"use client";

import { createColumnHelper } from "@tanstack/react-table";
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
import { AiOutlineDelete } from "react-icons/ai";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import axios from "axios";
import { showSuccessToast } from "@/app/utils/sweetAlert";
import { useState } from "react";
import { EditCategoryModal } from "./EditCategoryModal";
import { Modal } from "../../_components/Modal";

// Define the shape of your data
const columnHelper = createColumnHelper();

export const columns = ({ updateCategoriesList, categories }) => [
  {
    accessorKey: "id",
    header: "SL No.",
    cell: ({ row }) => row.index + 1,
  },

  {
    accessorKey: "category_title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const subcategoryCount = row.original.subcategory.length;
      return (
        <div className="flex flex-col items-start">
          {row.original.category_title}
          {subcategoryCount > 0 && (
            <span className="text-sm text-gray-500">
              {subcategoryCount} subcategories
            </span>
          )}
        </div>
      );
    },
    // enableSorting: true,
    sortingFn: (a, b) =>
      a.original.category_title.localeCompare(b.original.category_title), // Sort by name
    filterFn: "includesString",
  },
  {
    accessorKey: "subcategory",
    header: "Subcategory Name",
    cell: ({ row }) => {
      const subcategories = row.original.subcategory || [];
      return (
        <ul className="list-none">
          {subcategories.map((sub, index) => (
            <li className="mt-1 px-2 py-1 rounded text-xs text-white bg-gradient-to-r" key={index} style={{
              background: `hsl(${Math.random() * 360}, 100%, 70%)`,
            }}>
              {sub}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { id } = row.original;
      console.log(id);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [currentCategory, setCurrentCategory] = useState(null);
      const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
      };

      const handleUpdateCategory = (updateCategory) => {
        console.log("New Category:", updateCategory);

        axios
          .put(
            `http://localhost:5000/api/categories/updateCategory/${updateCategory.id}`,
            updateCategory
          )
          .then((response) => {
            console.log("Category updated successfully:", response.data);
            showSuccessToast("Category updated successfully");
            setIsModalOpen(false); // Close the modal after success
            updateCategoriesList();
          })
          .catch((error) => {
            console.error("Error during update category:", error);
          });

        setIsModalOpen(false);
      };

      const handleEdit = (id) => {
        const category = categories.find((cat) => cat.id === id);
        setCurrentCategory(category);
        setIsModalOpen(true);
        console.log(currentCategory);
      };

      // Handle Delete Action
      const handleDelete = (id) => {
        console.log("Delete clicked for id:", id);

        axios
          .delete(`http://localhost:5000/api/categories/deleteCategory/${id}`)
          .then((response) => {
            console.log("Category deleted successfully:", response.data);
            showSuccessToast("Category deleted successfully");
            updateCategoriesList();
          })
          .catch((error) => {
            console.error("Error during deleting category:", error);
          });
      };

      return (
        <>
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
              <DropdownMenuItem onClick={() => handleEdit(id)}>
                <span className="mr-1">
                  <CiEdit />
                </span>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(id)}
                className="text-red-500"
              >
                <span>
                  <AiOutlineDelete className="mr-1" />
                </span>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Modal
            isOpen={isModalOpen}
            onClose={handleModalToggle}
            title="Update Category"
          >
            <EditCategoryModal
              onSubmit={handleUpdateCategory}
              onCancel={handleModalToggle}
              currentCategory={currentCategory}
            />
          </Modal>
        </>
      );
    },
  },
];
