"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CourseDetails from "./CourseDetails";

const AddCourse = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    duration: "",
    category: "",
    lesson_duration:"",
    total_lesson:"",
    time_span:"",
    instructors: [],
    price: "",
    thumbnail: null,
    lessons: [],
    prerequisites: "",
    objectives: "",
    status:'',
  });

  const [currentLesson, setCurrentLesson] = useState({
    title: "",
    description: "",
    video: "",
    duration: "",
  });

  const steps = [
    { label: "Course Details" },
    { label: "Add Lessons" },
    { label: "Additional Information" },
    { label: "Review & Submit" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1);
      clearErrors();
    }
  };

  const handleBack = () =>
    setActiveStep((prevStep) => Math.max(0, prevStep - 1));

  const validateStep = () => {
    if (activeStep === 0) {
      return courseData.title && courseData.description && courseData.category;
    }
    if (activeStep === 1) {
      return courseData.lessons.length > 0;
    }
    return true;
  };

  const addLesson = () => {
    setCourseData((prev) => ({
      ...prev,
      lessons: [...prev.lessons, currentLesson],
    }));
    setCurrentLesson({ title: "", description: "", video: "", duration: "" });
  };

  const onSubmit = () => {
    console.log("Final Course Data: ", courseData);
    // Submit data to the backend
  };

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>

      <div className="mb-8">
        <div className="flex justify-between items-center ">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full border-2 ${
                  index <= activeStep ? "bg-green-500" : "bg-gray-300"
                } flex items-center justify-center`}
              >
                <span
                  className={`text-white text-xl ${
                    index <= activeStep ? "font-bold" : ""
                  }`}
                >
                  {index + 1}
                </span>
              </div>
              <p className="mt-2">{step.label}</p>
            </div>
          ))}
        </div>
        <div className="w-full h-1 bg-gray-300 mt-4">
          <div
            className="h-full bg-green-500"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 shadow-md"
      >
        {activeStep === 0 && (
          <CourseDetails courseData={courseData} setCourseData={setCourseData} errors={errors} handleNext={handleNext}/>
        )}

        {activeStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold">Step 2: Add Lessons</h2>

            <Label htmlFor="lessonTitle">Lesson Title</Label>
            <Input
              id="lessonTitle"
              placeholder="Enter lesson title"
              value={currentLesson.title}
              onChange={(e) =>
                setCurrentLesson({ ...currentLesson, title: e.target.value })
              }
              required
            />

            <Label htmlFor="lessonDescription" className="mt-4">
              Lesson Description
            </Label>
            <Textarea
              id="lessonDescription"
              placeholder="Enter lesson description"
              value={currentLesson.description}
              onChange={(e) =>
                setCurrentLesson({
                  ...currentLesson,
                  description: e.target.value,
                })
              }
              required
            />

            <Label htmlFor="lessonVideo" className="mt-4">
              Lesson Video (URL)
            </Label>
            <Input
              id="lessonVideo"
              placeholder="Enter lesson video URL"
              value={currentLesson.video}
              onChange={(e) =>
                setCurrentLesson({ ...currentLesson, video: e.target.value })
              }
              required
            />

            <Button type="button" className="mt-4" onClick={addLesson}>
              Add Lesson
            </Button>

            <ul className="mt-6">
              {courseData.lessons.map((lesson, index) => (
                <li key={index} className="mt-2">
                  {lesson.title} - {lesson.duration}
                </li>
              ))}
            </ul>

            <div className="flex justify-between mt-4">
              <Button onClick={handleBack}>Back</Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold">
              Step 3: Additional Information
            </h2>

            <Label htmlFor="prerequisites">Prerequisites</Label>
            <Textarea
              id="prerequisites"
              placeholder="Enter prerequisites"
              value={courseData.prerequisites}
              onChange={(e) =>
                setCourseData({ ...courseData, prerequisites: e.target.value })
              }
            />

            <Label htmlFor="objectives" className="mt-4">
              Learning Objectives
            </Label>
            <Textarea
              id="objectives"
              placeholder="Enter learning objectives"
              value={courseData.objectives}
              onChange={(e) =>
                setCourseData({ ...courseData, objectives: e.target.value })
              }
            />

            <div className="flex justify-between mt-4">
              <Button onClick={handleBack}>Back</Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold">Step 4: Review & Submit</h2>
            <pre>{JSON.stringify(courseData, null, 2)}</pre>
            <div className="flex justify-between mt-4">
              <Button onClick={handleBack}>Back</Button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddCourse;
