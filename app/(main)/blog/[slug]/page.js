import React from "react";
import BlogDetailsPage from "../../_components/BlogDetailsPage";


const page = async ({ params }) => {
  const { slug } =await params;
  console.log(slug);

  return (
    <div>
      <BlogDetailsPage slug={slug} />
    </div>
  );
};

export default page;
