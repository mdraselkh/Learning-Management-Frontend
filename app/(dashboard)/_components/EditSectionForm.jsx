"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";
import { FaTimes, FaTrash } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { TbCurrencyEuro, TbCurrencyTaka } from "react-icons/tb";
import PublishButton from "@/app/_components/PublishButton";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import axios from "axios";
import { FiTrash } from "react-icons/fi";
import { Switch } from "@/components/ui/switch";
import Loading from "@/app/loading";
import Delete from "@/app/_components/Delete";
import axiosInstance from "@/app/utils/axiosInstance";

const sectionSchema = z.object({
  title: z.string().min(3, "Title is required"),
  subtitle: z.string().min(3, "Subtitle is required").optional(),
  description: z.string().min(10, "Description is required"),
  thumbnail: z.any().optional(),
  video_url: z.any().optional(),
  isFree: z.boolean().optional(),
});

const EditSectionForm = ({
  courseId,
  section,
  isCompleted,
  onSectionChange,
}) => {
  const router = useRouter();
  //   console.log(course);
  console.log(isCompleted);
  console.log(courseId);
  console.log(section);

  const form = useForm({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      thumbnail: "",
      video_url: "",
      isFree: false,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = form;

  useEffect(() => {
    if (section) {
      reset({
        title: section.title || "",
        subtitle: section.subtitle || "",
        description: section.description || "",
        thumbnail: section.thumbnail || "",
        video_url: section.video_url || "",
        isFree: section.is_free || false,
      });
    }
  }, [section, reset]);

  console.log(errors);
  console.log(isSubmitting);
  console.log(isValid);

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("subtitle", values.subtitle || "");
      formData.append("description", values.description);
      if (values.thumbnail) formData.append("thumbnail", values.thumbnail);
      if (values.video_url) formData.append("video_url", values.video_url);
      formData.append("is_free", values.isFree);

      // Send FormData to backend
      await axiosInstance.patch(
        `/api/section/${courseId}/updateAnySection/${section.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showSuccessToast("Section Updated");

      window.location.reload();
    } catch (error) {
      console.log("Error while updating section:", error);
      showErrorToast("Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
        <Link href={`/courses/${courseId}/sections`}>
          <Button variant="outline" className="text-sm font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to curriculum
          </Button>
        </Link>

        <div className="flex gap-5 items-start">
          <PublishButton
            disabled={!isCompleted}
            courseId={courseId}
            sectionId={section.id}
            initialIsPublished={section.is_published}
            page="Section"
          />
          <Delete item="Section" courseId={courseId} sectionId={section.id} />
        </div>
      </div>

      <h1 className="text-xl font-bold">Section Details</h1>
      <p className="text-sm font-medium mt-2 mb-5">
        Complete this section with detailed information, good video and
        resources to give your students the best learning experience
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter section title"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onSectionChange("title", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* subTitle */}
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Subtitle</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter section subtitle"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onSectionChange("subtitle", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write section description..."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onSectionChange("description", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail */}
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      field.onChange(file); // Pass the file to form control
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Video Upload */}
          <FormField
            control={form.control}
            name="video_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Upload</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                      onSectionChange("video_url", file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Accessibility</FormLabel>
                  <FormDescription>
                    Everyone can access this section for FREE
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Link href={`/courses/${courseId}/sections`}>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <button
              className="px-4 py-2 cursor-pointer bg-yellow-500 rounded-lg"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditSectionForm;
