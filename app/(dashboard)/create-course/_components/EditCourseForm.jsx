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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";
import { FaTimes, FaTrash } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { TbCurrencyEuro, TbCurrencyTaka } from "react-icons/tb";
import PublishButton from "@/app/_components/PublishButton";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import axios from "axios";
import { FiTrash } from "react-icons/fi";
import Delete from "@/app/_components/Delete";
import { cn } from "@/lib/utils";

const courseSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  target_audience: z.string().optional(),
  objectives: z.array(z.string()).optional(),
  categoryId: z.string().min(1, "Category is required"),
  instructorIds: z
    .array(z.string())
    .nonempty("At least one instructor is required"),
  tags: z.array(z.string()).optional(),

  thumbnail: z.any().optional(),

  price: z
    .string()
    .min(1, "Price is required")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "Price must be a valid number",
    }),

  language: z.string().optional(),

  total_lesson: z.string().optional(),
  lesson_duration: z.string().optional(),
  time_span: z.string().optional(),

  course_label: z.string().min(1, "Course level is required"),
});

const EditCourseForm = ({
  course,
  categories,
  instructors,
  isCompleted,
  onCourseChange,
}) => {
  const router = useRouter();
  const [tags, setTags] = useState(course?.tags || []);
  const [objectives, setObjectives] = useState(course?.objectives || [""]);
  //   console.log(course);
  console.log(isCompleted);
  console.log(course);

  const languageOptions = [
    { value: "bangla", label: "Bangla" },
    { value: "english", label: "English" },
  ];

  const courseLevelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const form = useForm({
    resolver: zodResolver(courseSchema),
    mode: "onChange",
    defaultValues: {
      title: course.title,
      description: course.description || "",
      target_audience: course.target_audience || "",
      // objectives: course.objectives || [""],
      categoryId: course.category_id.toString(),
      instructorIds: course.instructor?.map((inst) => inst.id.toString()) || [],
      course_label: course.course_label || "",
      thumbnail: course.thumbnail || "",
      price: course.price || 0,
      total_lesson: course.total_lesson || "", // Changed to string
      lesson_duration: course.lesson_duration || "", // Changed to string
      time_span: course.time_span || "", // Changed to string
      language: course.language || "",
      // tags: course.tags || [],
    },
  });

  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = form;

  console.log(errors);
  console.log(isSubmitting);
  console.log(isValid);

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setValue("tags", [...tags, tag]);
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue("tags", updatedTags);
  };

  const handleAddObjective = () => {
    setObjectives([...objectives, ""]);
  };

  const handleRemoveObjective = (index) => {
    const updatedObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(updatedObjectives);
    setValue("objectives", updatedObjectives);
  };

  const handleObjectiveChange = (index, value) => {
    const updatedObjectives = [...objectives];
    updatedObjectives[index] = value;
    setObjectives(updatedObjectives);
    setValue("objectives", updatedObjectives);
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();

      values.tags = tags.length ? tags : course?.tags || [];
      values.objectives = objectives.length
        ? objectives
        : course?.objectives || [];

      // Append all form fields
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("target_audience", values.target_audience);
      formData.append("objectives", JSON.stringify(values.objectives));
      formData.append("categoryId", values.categoryId);
      formData.append("price", values.price);
      formData.append("language", values.language || "");
      formData.append("total_lesson", values.total_lesson);
      formData.append("lesson_duration", values.lesson_duration);
      formData.append("time_span", values.time_span);
      formData.append("course_label", values.course_label);

      // Convert tags and instructorIds to JSON
      formData.append("tags", JSON.stringify(values.tags));
      formData.append("instructorIds", JSON.stringify(values.instructorIds));

      // Append thumbnail file
      if (values.thumbnail instanceof File) {
        formData.append("thumbnail", values.thumbnail);
      } else {
        console.error("Thumbnail is not a valid file.");
      }

      // Log FormData for debugging
      console.log([...formData.entries()]);

      // Send FormData to backend
      await axios.patch(
        `http://localhost:5000/api/courses/updateAnyFieldCourses/${course.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
      showSuccessToast("Course Updated");
      router.refresh();
    } catch (error) {
      console.error("Error while updating course:", error);
      showErrorToast("Something went wrong!");
    }
  };

  const routes = [
    {
      label: "Basic Information",
      path: `/courses/${course.id}/basic`,
    },
    { label: "Curriculum", path: `/courses/${course.id}/sections` },
  ];
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
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

        <div className="flex gap-5 items-start">
          <PublishButton
            disabled={!isCompleted}
            courseId={course.id}
            initialIsPublished={course.is_published}
            page="Course"
          />
          <Delete item="Course" courseId={course.id} />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter course title"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onCourseChange("title", e.target.value);
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
                <FormLabel>Course Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write course description..."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onCourseChange("description", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="target_audience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Audience</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write target audience..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Objectives */}
          <FormField
            control={form.control}
            name="objectives"
            render={() => (
              <FormItem>
                <FormLabel>Objectives</FormLabel>
                <div className="space-y-3">
                  {objectives.map((objective, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Input
                        value={objective}
                        onChange={(e) =>
                          handleObjectiveChange(index, e.target.value)
                        }
                        placeholder="Enter objective"
                        className="w-full"
                      />
                      <FaTimes
                        onClick={() => handleRemoveObjective(index)}
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={handleAddObjective}
                  className="mt-2"
                >
                  Add Objective
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <div className="w-1/3">
              {/* Category */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      instanceId="category-select"
                      value={
                        field.value
                          ? {
                              value: field.value,
                              label: categories.find(
                                (c) => c.id.toString() === field.value
                              )?.category_title,
                            }
                          : null
                      }
                      // onChange={(option) => field.onChange(option?.value)} // Ensure correct value
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption?.value || null;

                        field.onChange(selectedValue);

                        onCourseChange("categoryId", selectedValue);
                      }}
                      options={categories.map((category) => ({
                        value: category.id.toString(),
                        label: category.category_title,
                      }))}
                      placeholder="Select category"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/3">
              {/* Instructors */}
              <FormField
                control={form.control}
                name="instructorIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructors</FormLabel>
                    <Select
                      instanceId="instructors-select"
                      className="mt-1"
                      isMulti
                      value={
                        instructors
                          ?.filter((instructor) =>
                            field.value?.includes(instructor.id.toString())
                          )
                          .map((instructor) => ({
                            value: instructor.id.toString(),
                            label: instructor.name,
                          })) || []
                      }
                      // onChange={(selectedOptions) => {
                      //   // Extract only the instructor IDs and pass it to the form field
                      //   field.onChange(
                      //     selectedOptions.map((option) => option.value)
                      //   );
                      // }}
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption?.value || null;

                        field.onChange(
                          selectedOption.map((option) => option.value)
                        );

                        onCourseChange("instructorIds", selectedValue);
                      }}
                      options={instructors.map((instructor) => ({
                        value: instructor.id.toString(),
                        label: instructor.name,
                      }))}
                      placeholder="Select instructors"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/3">
              {/* Language */}
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select
                      instanceId="language-select"
                      value={
                        languageOptions.find(
                          (option) => option.value === field.value
                        ) || null
                      } // Match field.value with languageOptions
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption?.value)
                      }
                      options={languageOptions}
                      isClearable
                      placeholder="Select Language"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Course Level */}
          <FormField
            control={form.control}
            name="course_label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Level</FormLabel>
                <Select
                  instanceId="course_label-select"
                  value={
                    courseLevelOptions.find(
                      (option) => option.value === field.value
                    ) || null
                  } // Match field.value with courseLevelOptions
                  // onChange={(selectedOption) =>
                  //   field.onChange(selectedOption?.value)
                  // }
                  onChange={(selectedOption) => {
                    const selectedValue = selectedOption?.value || null;

                    field.onChange(selectedValue);

                    onCourseChange("course_label", selectedValue);
                  }}
                  options={courseLevelOptions}
                  isClearable
                  placeholder="Select Course Level"
                />
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

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 rounded-lg text-sm text-black bg-gradient-to-tl from-yellow-100 to-yellow-500 "
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="ml-2 text-black hover:text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <Input
                id="tagInput"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag(e.target.value);
                    e.target.value = "";
                  }
                }}
                placeholder="Add a tag"
              />
            </div>
          </div>

          {/* Total Lessons */}
          <FormField
            control={form.control}
            name="total_lesson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Lessons</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter total lessons"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Lesson Duration */}
          <FormField
            control={form.control}
            name="lesson_duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Duration (hh:mm:ss)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="00:00:00"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      // Allow only digits and colons, and limit the format to hh:mm:ss
                      const regex = /^(\d{0,2}):?(\d{0,2})?:?(\d{0,2})?$/;

                      if (regex.test(value) || value === "") {
                        field.onChange(value); // Update form state
                      }
                    }}
                    maxLength={8} // hh:mm:ss is 8 characters long
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time Span */}
          <FormField
            control={form.control}
            name="time_span"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Span</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter time span (e.g., 6 weeks)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="flex items-center">
                    {" "}
                    Price (<TbCurrencyTaka />)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    // min={0}
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onCourseChange("price", e.target.value || 0);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Link href="/course-list">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <button
              // className="px-4 py-2 cursor-pointer bg-yellow-500 rounded-lg"
              className={cn(
                "px-4 py-2 rounded-lg transition-all duration-200",
                isValid && !isSubmitting
                  ? "bg-yellow-500 text-black hover:bg-yellow-400 cursor-pointer"
                  : "bg-yellow-200 text-gray-400 cursor-not-allowed"
              )}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <span className='flex items-center gap-2'>
                  Saving
                  <Loader2 className="h-4 w-4 animate-spin" />
                </span>
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

export default EditCourseForm;
