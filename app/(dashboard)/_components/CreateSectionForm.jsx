"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
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
import { Loader2 } from "lucide-react";
import SectionList from "./SectionList";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import { useEffect, useState } from "react";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and must be at least 2 characters long",
  }),
});

const CreateSectionForm = ({ course }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [sectionList, setSectionList] = useState([]);

  console.log(course);
  console.log(sectionList);
  const fetchSection = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/section/${course.id}/getAllSections`
      );
      console.log(response.data);
      setSectionList(response.data?.data);
    } catch (err) {
      console.log("Error fetching sections:", err);
    }
  };

  useEffect(() => {
    if (course.id) fetchSection();
  }, [course.id]);

  // Route navigation links
  const routes = [
    { label: "Basic Information", path: `/courses/${course.id}/basic` },
    { label: "Curriculum", path: `/courses/${course.id}/sections` },
  ];

  // Initialize form with react-hook-form and zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isValid, isSubmitting } = form.formState;
  const { reset } = form;
  console.log(isSubmitting);
  console.log(isValid);

  // Form submission handler
  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values); // Log to see what values are being passed
    try {
      const response = await axios.post(
        `http://localhost:5000/api/section/${course.id}/createSection`,
        values
      );
      console.log("API response:", response.data);
      console.log("section Id Is:", response.data.data.id);
      router.push(
        `/courses/${course.id}/sections/${response.data?.data?.id}`
      );
      showSuccessToast("New Section created!");
      fetchSection();
      reset();
    } catch (err) {
      showErrorToast("Something went wrong!");
      console.log("Failed to create a new section:", err);
    }
  };

  // Reorder sections handler
  const onReorder = async (updateData) => {
    console.log(updateData);
    try {
      await axios.patch(
        `http://localhost:5000/api/section/${course.id}/reorderSections`,
        {
          updateData,
        }
      );
      showSuccessToast("Sections reordered successfully");
    } catch (err) {
      showErrorToast("Something went wrong!");
      console.error("Failed to reorder sections:", err);
    }
  };

  console.log(pathname);

  return (
    <div className="px-10 py-6 bg-white min-h-screen">
      {/* Navigation Links */}
      <div className="flex gap-5">
        {routes.map((route) => (
          <Link key={route.path} href={route.path}>
            <button
              className={
                pathname === route.path
                  ? "bg-yellow-500 text-black px-4 py-2 rounded-lg"
                  : "border px-4 py-2 rounded-lg"
              }
            >
              {route.label}
            </button>
          </Link>
        ))}
      </div>

      {/* Section List */}
      <SectionList
        items={sectionList}
        onReorder={onReorder}
        onEdit={(id) => router.push(`/courses/${course.id}/sections/${id}`)}
      />

      {/* Add New Section */}
      <h1 className="text-xl font-bold mt-5">Add New Section</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Introduction" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Link href={`/courses/${course.id}/basic`}>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="px-4 py-2 cursor-pointer bg-yellow-500 rounded-lg"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateSectionForm;
