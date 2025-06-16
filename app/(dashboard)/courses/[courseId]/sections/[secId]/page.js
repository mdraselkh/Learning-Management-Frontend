"use client";
import EditSectionForm from "@/app/(dashboard)/_components/EditSectionForm";
import AlertBanner from "@/app/_components/AlertBanner";
import axios from "axios";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

const SectionDetailsPage = ({ params }) => {
  const unwrappedParams = use(params);
  const { courseId, secId } = unwrappedParams;
  const [section, setSection] = useState([]);

  console.log(secId, courseId); 

  const fetchSection = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/section/${courseId}/getSection/${secId}`
      );
      console.log(response.data);
      setSection(response.data?.data);
    } catch (err) {
      console.log("Error fetching sections:", err);
    }
  };

  useEffect(() => {
    if (secId) fetchSection();
  }, [courseId, secId]);

  if (!secId && !section) {
    return redirect(`/courses/${courseId}/sections`);
  }

  const requiredFields = [
    section.title,
    section.subtitle,
    section.description,
    section.video_url,
  ];
  const requiredFieldsCount = requiredFields.length;
  const missingFields = requiredFields.filter((field) => !field); // Return falsy values: undefined, null, 0, false, NaN, ''
  const missingFieldsCount = missingFields.length;
  const isCompleted = requiredFields.every(Boolean);

  console.log("Is Completed:", isCompleted);
  console.log("Missing Fields Count:", missingFieldsCount);

    const handleSectionChange = (field, value) => {
    setSection((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="px-10 py-5 bg-white">
      <AlertBanner
        isCompleted={isCompleted}
        requiredFieldsCount={requiredFieldsCount}
        missingFieldsCount={missingFieldsCount}
      />
      <EditSectionForm
        section={section}
        courseId={courseId}
        isCompleted={isCompleted}
        onSectionChange={handleSectionChange}
      />
    </div>
  );
};

export default SectionDetailsPage;
