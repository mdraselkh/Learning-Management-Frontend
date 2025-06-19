import axiosInstance from "@/app/utils/axiosInstance";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiLock } from "react-icons/ci";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { useSelector } from "react-redux";

const Curriculum = ({ lessonData, coursewithId }) => {
  const [activeLesson, setActiveLesson] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [accessList, setAccessList] = useState([]);
  console.log(user);
  // console.log(canAccess);

  const fetchSectionsAccess = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/section/${coursewithId.id}/getSections?userId=${user?.userId}`
      );
      console.log(response);
      setAccessList(response.data.sections);
    } catch (error) {
      console.log("error while fetching sections access", error);
    }
  };

  useEffect(() => {
    if (user?.userId && coursewithId?.id) {
      fetchSectionsAccess();
    }
  }, [user?.userId, coursewithId?.id]);

  console.log(accessList);

  return (
    <div className="pt-8 flex flex-col items-start justify-between gap-8">
      <div>
        <h2 className="text-4xl text-black font-semibold mb-4 font-serif">
          Course details
        </h2>
        <p className="text-base text-gray-500">{coursewithId?.description}</p>
      </div>
      <div className="w-full">
        <h3 className="text-2xl font-semibold text-black font-serif py-2 border-b border-black">
          Lessons
        </h3>
        {/* {lessonData.map((lesson, index) => (
          <div key={index} className="py-2 border-b border-gray-300">
            
            <div className="flex items-center justify-between">
              <p className="text-base text-gray-800">{`Lesson ${index + 1}: ${
                lesson.title
              }`}</p>
              <h3 className="flex items-center">
                <span
                  className={`px-4 py-1 text-gray-400 bg-teal-50 rounded ${
                    lesson.is_free && "cursor-pointer"
                  }`}
                >
                  Video
                </span>
                {lesson.is_free ? (
                  <MdOutlineSmartDisplay
                    className="text-lg ml-2 cursor-pointer"
                    onClick={() =>
                      setActiveLesson(activeLesson === index ? null : index)
                    } // Toggle the video display
                  />
                ) : (
                  <CiLock className="text-lg ml-2" />
                )}
              </h3>
            </div>

            
            {lesson.is_free && activeLesson === index && (
              <div className="py-5">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {lesson.subtitle}
                  </h3>
                  <p className="text-base text-gray-500">
                    {lesson.description}
                  </p>
                </div>
                <div className=" my-5 w-full h-[300px] lg:h-[420px] max-w-4xl aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                  <video
                    src={lesson.video_url}
                    title="Lesson Video"
                    controls
                    className="w-full h-full"
                  ></video>
                </div>
              </div>
            )}
          </div>
        ))} */}
        {lessonData.map((lesson, index) => {
          const sectionAccess = accessList.find((s) => s.id === lesson.id);
          const canAccess = lesson.is_free || sectionAccess?.can_access;

          return (
            <div key={index} className="py-2 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <p className="text-base text-gray-800">
                  {`Lesson ${index + 1}: ${lesson.title}`}
                </p>
                <h3 className="flex items-center">
                  <span
                    className={`px-4 py-1 text-gray-400 bg-teal-50 rounded ${
                      canAccess && "cursor-pointer"
                    }`}
                  >
                    Video
                  </span>
                  {canAccess ? (
                    <MdOutlineSmartDisplay
                      className="text-lg ml-2 cursor-pointer"
                      onClick={() =>
                        setActiveLesson(activeLesson === index ? null : index)
                      }
                    />
                  ) : (
                    <CiLock className="text-lg ml-2" />
                  )}
                </h3>
              </div>

              {canAccess && activeLesson === index && (
                <div className="py-5">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      {lesson.subtitle}
                    </h3>
                    <p className="text-base text-gray-500">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="my-5 w-full h-[300px] lg:h-[420px] max-w-4xl rounded-lg overflow-hidden shadow-lg">
                    <video
                      src={lesson.video_url}
                      title="Lesson Video"
                      controls
                      className="w-full h-full"
                    ></video>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Curriculum;
