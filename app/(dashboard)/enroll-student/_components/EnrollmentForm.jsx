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
import axiosInstance from "@/app/utils/axiosInstance";

// Zod validation schema
const formSchema = z.object({
  studentId: z.number().min(1, "Please select a student"),
  courseId: z.number().min(1, "Please select a course"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email format"),
  paymentMethod: z.enum(
    ["free","card", "bkash", "nagad"],
    "Please select a payment method"
  ),
  enrollStatus: z.enum(
    ["active", "inactive", "canceled"],
    "Select Enrollment Status"
  ),
  paymentStatus: z.enum(
    ["completed", "pending", "canceled"],
    "Select Payment Status"
  ),
});

const EnrollmentForm = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with zod schema validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      courseId: "",
      city: "",
      address: "",
      phone: "",
      email: "",
      paymentMethod: "",
      enrollStatus: "canceled", // Default status to "pending"
      paymentStatus: "pending", // Default status to "pending"
    },
  });

  const { isValid, isSubmitting } = form.formState;

  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          "/api/users/getAllusers"
        );
        console.log(response);
        const filteredUsers = response.data.users.filter(
          (user) => user.role === "student"
        );
        console.log(filteredUsers);
        setStudents(
          filteredUsers.map((student) => ({
            value: student.id,
            label: student.name,
            city: student.city,
            address: student.address,
            phone: student.phone,
            email: student.email,
          }))
        );

        const courseResponse = await axiosInstance.get(
          "/api/courses/getAllCourses"
        );
        console.log(courseResponse);

        setCourses(
          courseResponse.data.data.map((course) => ({
            value: course.id,
            label: course.title,
            price: course.price,
          }))
        );
      } catch (error) {
        console.error("Error fetching students and courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentsAndCourses();
  }, []);

  const onSubmit = async (values) => {
    console.log("Submitting form with values:", values); // Log submitted form values
    try {
      const response = await axiosInstance.post(
        "/api/enrollment/addEnrollment",
        values
      );
      console.log("Enrollment created successfully:", response.data);
      router.push(`/enrollment-history`);
      showSuccessToast("Student Enrolled Successfully!");
    } catch (error) {
      console.error("Failed to enroll student:", error);
      showErrorToast("Something went wrong!");
    }
  };

  console.log(students);
  useEffect(() => {
    const selectedStudent = students.find(
      (student) => student.value === form.getValues("studentId")
    );

    if (selectedStudent) {
      if (selectedStudent.city) {
        form.setValue("city", selectedStudent.city);
      }
      if (selectedStudent.address) {
        form.setValue("address", selectedStudent.address);
      }
      if (selectedStudent.phone) {
        form.setValue("phone", selectedStudent.phone);
      }
      if (selectedStudent.email) {
        form.setValue("email", selectedStudent.email);
      }
    }
  }, [form.watch("studentId")]);

  useEffect(() => {
    const selectedCourse = courses.find(
      (course) => course.value === form.watch("courseId")
    );

    if (selectedCourse) {
      if (selectedCourse.price === 0) {
        form.setValue("paymentMethod", "free");
        form.setValue("paymentStatus", "completed");
      } else {
        form.setValue("paymentMethod", "");
        form.setValue("paymentStatus", "pending");
      }
    }
  }, [form.watch("courseId")]);

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-xl font-bold">Enroll a New Student</h1>
      <p className="text-sm mt-3">
        Please fill out the details to enroll a student.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-10"
        >
          <div className="flex gap-5">
            {/* Student Field */}
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student</FormLabel>
                    <FormControl>
                      <Select
                        instanceId="student-select"
                        className="mt-1"
                        value={
                          students.find(
                            (student) => student.value === field.value
                          ) || null
                        }
                        onChange={(selectedOption) =>
                          field.onChange(
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        options={students}
                        placeholder="Select a student"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-1/3">
              {/* Course Field */}
              <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Select
                        instanceId="course-select"
                        className="mt-1"
                        value={
                          courses.find(
                            (course) => course.value === field.value
                          ) || null
                        }
                        onChange={(selectedOption) =>
                          field.onChange(
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        options={courses}
                        placeholder="Select a course"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-1/3">
              {/* City Field */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-5">
            {/* Address Field */}
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone Field */}
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email Field */}
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-5 w-full">
            {/* Payment Method Field */}
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <Select
                        instanceId="payment-method-select"
                        className="mt-1"
                        value={
                          field.value
                            ? {
                                value: field.value,
                                label:
                                  field.value.charAt(0).toUpperCase() +
                                  field.value.slice(1).toLowerCase(),
                              }
                            : null
                        }
                        onChange={(selectedOption) =>
                          field.onChange(
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        options={[
                          { value: "free", label: "Free" },
                          { value: "card", label: "Card" },
                          { value: "bkash", label: "bKash" },
                          { value: "nagad", label: "Nagad" },
                        ]}
                        placeholder="Select a payment method"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/3">
              {/* Enrollment Status Field */}
              <FormField
                control={form.control}
                name="enrollStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enrollment Status</FormLabel>
                    <FormControl>
                      <Select
                        instanceId="enroll-status-select"
                        className="mt-1"
                        value={{
                          value: field.value,
                          label:
                            field.value === "active"
                              ? "Active"
                              : field.value === "inactive"
                              ? "Inactive"
                              : "Canceled",
                        }}
                        onChange={(selectedOption) =>
                          field.onChange(
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        options={[
                          { value: "active", label: "Active" },
                          { value: "completed", label: "Completed" },
                          { value: "canceled", label: "Canceled" },
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

            {/* Payment Status Field */}
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Status</FormLabel>
                    <FormControl>
                      <Select
                        instanceId="payment-status-select"
                        className="mt-1"
                        value={{
                          value: field.value,
                          label:
                            field.value === "completed"
                              ? "Completed"
                              : field.value === "pending"
                              ? "Pending"
                              : "Canceled",
                        }}
                        onChange={(selectedOption) =>
                          field.onChange(
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        options={[
                          { value: "completed", label: "Completed" },
                          { value: "pending", label: "Pending" },
                          { value: "canceled", label: "Canceled" },
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

export default EnrollmentForm;
