"use client";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";

// Zod validation schema
const formSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Description is required"),
  image_url: z
    .instanceof(File) // Make sure the value is a file
    .refine((file) => file && file.type.startsWith("image/"), {
      message: "Thumbnail must be an image", // Custom message
    })
    .optional(),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  status: z
    .string()
    .min(1, {
      message: "Status is required.",
    })
    .optional(),
});

const CreateBlogForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image_url: "",
      category: "",
      status: "pending", // Default status to "pending"
    },
  });

  const { isValid, isSubmitting } = form.formState;
  console.log(isValid, isSubmitting);

  // Access the user ID from Redux
  const userId = useSelector((state) => state.auth.user?.userId);
  console.log(userId);

  const onSubmit = async (values) => {
    console.log("Submitting form with values:", values); // Log submitted form values
  
    if (!userId) {
      showErrorToast("User not authenticated.");
      return;
    }
  
    // Create a FormData object
    const formData = new FormData();
    formData.append("title", values.title); // Append title
    formData.append("content", values.content); // Append content
    if (values.image_url) {
      formData.append("image_url", values.image_url); // Append image file
    }
    formData.append("category", values.category); // Append category
    formData.append("status", values.status || "pending"); // Append status
    formData.append("author_id", userId); // Append author_id
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/blog/addblog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type
          },
        }
      );
      console.log("Blog created successfully:", response.data);
      router.push(`/blog-list`);
      showSuccessToast("Blog Created Successfully!");
    } catch (error) {
      console.error("Failed to create blog:", error);
      showErrorToast("Something went wrong!");
    }
  };
  

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-xl font-bold">Create a Blog</h1>
      <p className="text-sm mt-3">
        Please fill out the details to create a blog.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write course description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5 w-full">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        instanceId="category-select"
                        className="mt-1"
                        value={
                          field.value
                            ? {
                                value: field.value,
                                label:
                                  field.value === "career"
                                    ? "Career"
                                    : field.value === "development"
                                    ? "Development"
                                    : "Teaching",
                              }
                            : null
                        }
                        onChange={(selectedOption) =>
                          field.onChange(
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        options={[
                          { value: "career", label: "Career" },
                          { value: "development", label: "Development" },
                          { value: "teaching", label: "Teaching" },
                        ]}
                        placeholder="Select a category"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files
                            ? e.target.files[0]
                            : null;
                          field.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-1/2">
            {/* Enrollment Status Field */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      instanceId="status-select"
                      className="mt-1"
                      value={{
                        value: field.value,
                        label:
                          field.value === "published"
                            ? "Published"
                            : field.value === "pending"
                            ? "Pending"
                            : "Draft",
                      }}
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      options={[
                        { value: "published", label: "Published" },
                        { value: "pending", label: "Pending" },
                        { value: "draft", label: "Draft" },
                      ]}
                      placeholder="Select status"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="mt-5 bg-yellow-500 hover:bg-yellow-300 text-black"
            
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateBlogForm;
