import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FiTrash } from "react-icons/fi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../utils/sweetAlert";
import { Button } from "@/components/ui/button";

const Delete = ({ item, courseId, sectionId }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  console.log(item, courseId, sectionId);

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      const url =
        item === "Section"
          ? `http://localhost:5000/api/section/${courseId}/deleteSection/${sectionId}`
          : `http://localhost:5000/api/courses/deleteCourses/${courseId}`;
      await axios.delete(url);

      setIsDeleting(false);

      const pushedUrl =
        item === "Section" ? `/courses/${courseId}/sections` : `/course-list`;
      router.push(pushedUrl);
      router.refresh();
      showSuccessToast(`${item} deleted`);
    } catch (err) {
      showErrorToast(`Something went wrong!`);
      console.log(`Failed to delete the ${item}`, err);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`${
            "px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-300"
          }`}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FiTrash className="h-4 w-4 text-black" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
            {item}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-yellow-500" onClick={onDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
