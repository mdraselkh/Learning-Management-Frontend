"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../utils/sweetAlert";
import axiosInstance from "../utils/axiosInstance";

const PublishButton = ({
  disabled,
  courseId,
  sectionId,
  initialIsPublished,
  page,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(initialIsPublished);

  // Update the state if initialIsPublished changes
  useEffect(() => {
    setIsPublished(initialIsPublished);
  }, [initialIsPublished]);

  console.log(page, initialIsPublished, sectionId, courseId);
  console.log("Current isPublished:", isPublished);

  const onClick = async () => {
    const baseUrl = `/api`;

    // Dynamically set the URL based on the `page`
    const url =
      page === "Section"
        ? `${baseUrl}/section/${courseId}/publishSections/${sectionId}`
        : `${baseUrl}/courses/${courseId}`;

    console.log(url); // Correct URL will now be logged

    try {
      setIsLoading(true);
      const newIsPublished = !isPublished;

      await axiosInstance.patch(`${url}/${newIsPublished ? "publish" : "unpublish"}`);

      // Update the state with the new value
      setIsPublished(newIsPublished);

      // Show success toast with the correct message
      showSuccessToast(
        `${page} ${newIsPublished ? "published" : "unpublished"}`
      );

      // Refresh the page or perform any necessary updates
      router.refresh();
      //   if (isPublished) {
      //     await axios.patch(`${url}/unpublish`);
      //     setIsPublished(false);
      //   } else {
      //     await axios.patch(`${url}/publish`);
      //     setIsPublished(true);
      //   }

      //   showSuccessToast(`${page} ${isPublished ? "unpublished" : "published"}`);
      //   router.refresh();
    } catch (err) {
      showErrorToast("Something went wrong!");
      console.log(
        `Failed to ${isPublished ? "unpublish" : "publish"} ${page}`,
        err
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPublished ? (
        "Unpublish"
      ) : (
        "Publish"
      )}
    </Button>
  );
};

export default PublishButton;
