import React from "react";
import CourseDetailsPage from "../_components/CourseDetailsPage";
import { notFound } from "next/navigation";


const page = async ({ params }) => {
  const { slug } =await params;

  // const validSlugs = ["building-single-page-applications-with-react"];
  // const isSlugValid = validSlugs.includes(slug);

  // if (!isSlugValid) {
  //   notFound();
  // }

  return (
    <div>
      <CourseDetailsPage slug={slug} />
    </div>
  );
};

export default page;
