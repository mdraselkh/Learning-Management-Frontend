"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Select from "react-select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import axiosInstance from "@/app/utils/axiosInstance";

// Zod validation schema
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title is required and must have at least 3 characters.",
  }),
  category_id: z.string().min(1, {
    message: "Category is required.",
  }),
  instructors: z
    .array(z.string())
    .min(1, {
      message: "At least one instructor is required.",
    })
    .optional(),
});

const CreateCourseForm = ({ categories, instructors }) => {
  const router = useRouter();

  // Initialize form with zod schema validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category_id: "", // Default to empty string for category
      instructors: [], // Default to empty array for instructors
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values) => {
    console.log("Submitting form with values:", values); // Log submitted form values
    // Check if instructors are properly included in values
    console.log("Instructors value:", values.instructors);
    try {
      const response = await axiosInstance.post(
        "/api/courses/createCourses",
        values
      );
      console.log("Course created successfully:", response.data);
      router.push(`/courses/${response.data.id}/basic`);
      showSuccessToast("New Course Created!");
    } catch (error) {
      console.error("Failed to create new course:", error);
      showErrorToast("Something went wrong!");
    }
  };

  return (
    <div className="p-10 bg-white">
      <h1 className="text-xl font-bold">
        Let’s give some basics for your course
      </h1>
      <p className="text-sm mt-3">
        It’s okay if you can’t think of a good title or correct category now.
        You can change them later.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-10"
        >
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Web Development for Beginners"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Field */}
          <FormField
            control={form.control}
            name="category_id"
            
            render={({ field }) => {
              console.log("Selected category_id (field.value):", field.value);
              const selectedCategory = categories.find(
                (category) => category.id === Number(field.value)
              );

              return (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      instanceId="category-select"
                      className="mt-1 w-1/3"
                      value={
                        selectedCategory
                          ? {
                              value: selectedCategory.id.toString(),
                              label: selectedCategory.category_title,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? String(selectedOption.value) : ""
                        )
                      }
                      options={categories.map((category) => ({
                        value: category.id.toString(),
                        label: category.category_title,
                      }))}
                      placeholder="Select category"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Instructors Field */}
          <FormField
            control={form.control}
            name="instructors"
            render={({ field }) => {
              console.log("Selected instructors field.value:", field.value); // Log the value of selected instructors

              return (
                <FormItem>
                  <FormLabel>Instructors</FormLabel>
                  <FormControl>
                    <Select
                      instanceId="instructors-select"
                      className="mt-1 w-1/3"
                      isMulti
                      value={instructors
                        .filter((instructor) =>
                          field.value?.includes(instructor.id.toString())
                        ) // Check if the instructor id exists in selected values
                        .map((instructor) => ({
                          value: instructor.id.toString(),
                          label: instructor.name,
                        }))}
                      onChange={(selectedOptions) => {
                        console.log(
                          "Selected options onChange:",
                          selectedOptions
                        ); // Log the selected options
                        // Map the selected options correctly to pass only the ids
                        field.onChange(
                          selectedOptions
                            ? selectedOptions.map((option) => option.value)
                            : []
                        );
                      }}
                      options={instructors.map((instructor) => ({
                        value: instructor.id.toString(), // This is the value to send back (instructor ID)
                        label: instructor.name, // The label that will be shown in the dropdown
                      }))}
                      placeholder="Select instructors"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Submit Button */}
          <button
            className="px-4 py-2 cursor-pointer bg-yellow-500 rounded-lg text-black hover:scale-95 transition-all duration-300"
            type="submit"
          >
            Create
          </button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourseForm;
