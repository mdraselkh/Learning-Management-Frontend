import React from "react";
import CourseDetailsPage from "../_components/CourseDetailsPage";

const page = async ({ params }) => {
  const { slug } =await params;
  return (
    <div>
      <CourseDetailsPage slug={slug} />
    </div>
  );
};

export default page;
