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
    ["active", "completed", "canceled"],
    "Select Enrollment Status"
  ),
  paymentStatus: z.enum(
    ["completed", "pending", "canceled"],
    "Select Payment Status"
  ),
});

const EditEnrollmentForm = ({ enroll }) => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with zod schema validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: enroll?.studentId || "",
      courseId: enroll?.courseId || "",
      city: enroll?.city || "",
      address: enroll?.address || "",
      phone: enroll?.phone || "",
      email: enroll?.email || "",
      paymentMethod: enroll?.paymentMethod || "",
      enrollStatus: enroll?.enrollStatus || "canceled", // Default to "canceled"
      paymentStatus: enroll?.paymentStatus || "pending", // Default to "pending"
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values) => {
    const payload = {};
  
    if (values.enrollStatus !== undefined) {
      payload.enrollStatus = values.enrollStatus;
    }
  
    if (values.paymentStatus !== undefined) {
      payload.paymentStatus = values.paymentStatus;
    }
  
    console.log("Submitting form with values:", payload);
  
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/enrollment/updateStatus/${enroll.studentId}`,
        payload // Send only the populated payload
      );
      console.log("Enrollment updated successfully:", response.data);
      showSuccessToast("Enrollment Updated Successfully!");
    } catch (error) {
      console.error("Failed to update enrollment:", error);
      showErrorToast("Something went wrong!");
    }
  };
  
  

  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      setIsLoading(true);
      try {
        const [studentsResponse, coursesResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/users/getAllusers"),
          axios.get("http://localhost:5000/api/courses/getAllCourses"),
        ]);

        const filteredUsers = studentsResponse.data.users.filter(
          (user) => user.role === "student"
        );
        setStudents(
          filteredUsers.map((student) => ({
            value: student.id,
            label: student.name,
          }))
        );

        setCourses(
          coursesResponse.data.data.map((course) => ({
            value: course.id,
            label: course.title,
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

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-xl font-bold">Update Enroll Data</h1>
      <p className="text-sm mt-3">
        Please fill out the details to update enroll data.
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
                        isDisabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Course Field */}
            <div className="w-1/3">
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
                        isDisabled

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* City Field */}
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                        
                        <Input placeholder="Enter city" {...field} disabled />
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
                      <Input placeholder="Enter address" {...field} disabled />
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
                      <Input placeholder="Enter phone number" {...field} disabled/>
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
                      <Input placeholder="Enter email" {...field} disabled/>
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
                            ? { value: field.value, label: field.value }
                            : null
                        }
                        onChange={(selectedOption) =>
                          field.onChange(
                            selectedOption ? selectedOption.value : ""
                          )
                        }
                        options={[
                          { value: "card", label: "Card" },
                          { value: "bkash", label: "bKash" },
                          { value: "nagad", label: "Nagad" },
                        ]}
                        placeholder="Select a payment method"
                        required
                        isDisabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Enrollment Status Field */}
            <div className="w-1/3">
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
                        value={
                          field.value
                            ? { value: field.value, label: field.value }
                            : null
                        }
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
                        placeholder="Select enrollment status"
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
                        value={
                          field.value
                            ? { value: field.value, label: field.value }
                            : null
                        }
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
                        placeholder="Select payment status"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-10 text-left">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-yellow-500 text-black hover:bg-yellow-300"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update Enrollment"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditEnrollmentForm;
