import { useCourseAccess } from "@/app/hooks/useCourseAccess";
import { addToCart } from "@/app/store/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const CourseDetailsBanner = ({ Course, coursewithId, hasFullAccess }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // const { accessData: hasFullAccess, loading } = useCourseAccess(
  //   user?.userId,
  //   Course?.id
  // );

  // console.log(hasFullAccess);
  console.log(user);

  const handleEnroll = () => {
    if (user && isAuthenticated) {
      dispatch(addToCart(Course));
    } else {
      router.push("/login");
    }
  };
  console.log(Course);
  console.log(coursewithId);

  return (
    <div className="relative w-full">
      {/* Background Image */}
      <Image
        src="/images/aboutbanner.jpg"
        alt="Hero Background"
        className="z-0 w-full h-[500px] md:h-[700px] object-cover"
        width={500}
        height={500}
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 z-5"></div>

      {/* Hero Section */}
      {Course && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
          <div className="container mx-auto max-w-7xl flex flex-row items-center justify-between px-8 xl:px-0">
            <div className="flex flex-col items-start justify-center gap-6 xl:px-0">
              <h3 className="text-white font-semibold text-xs md:text-base uppercase">
                {Course.categoryname}
              </h3>
              <h1 className="text-xl md:text-4xl lg:text-5xl text-white font-bold max-w-3xl">
                {Course.title}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                {/* Render Stars */}
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < Math.floor(Course.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      } text-xs md:text-xl`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {/* Rating Number */}
                <p className="text-xs md:text-sm font-medium text-gray-400">
                  {Course.rating}
                </p>
                {/* Number of Reviews */}
                <p className="text-xs md:text-sm text-gray-400">
                  ({Course.reviewno})
                </p>
              </div>
            </div>

            {Course.coursefee !== "Free" && (
              <div className="flex items-end justify-center gap-6 flex-col">
                <h2 className="text-white font-bold text-xl md:text-4xl lg:text-5xl flex items-center">
                  <TbCurrencyTaka /> {Course.coursefee}
                </h2>
                {hasFullAccess ? (
                  <p className="px-6 md:px-10 py-2 md:py-3 font-semibold text-black bg-green-500 rounded-md hover:scale-95 transition-all duration-300">
                    Already Enrolled
                  </p>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="px-6 md:px-10 py-2 md:py-3 cursor-pointer font-semibold text-black bg-yellow-500 rounded-md hover:scale-95 transition-all duration-300"
                  >
                    Enroll
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Course Details */}
      <div className="absolute w-full h-full z-10 px-4 xl:px-0 left-0 flex items-end -bottom-[400px] md:-bottom-28 lg:-bottom-16 justify-center">
        <div className="bg-white container mx-auto max-w-7xl rounded-md shadow-sm px-10 py-6 lg:px-16 lg:py-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-center justify-between gap-10 lg:gap-0">
          <div className="flex items-center md:items-start justify-center gap-5 lg:border-r border-gray-300 lg:pr-10">
            <Image
              src="/images/time.png"
              alt="Time"
              className="w-10 h-10 object-cover"
              width={50}
              height={50}
            />
            <h2 className="flex flex-col items-start justify-center gap-2 text-base font-semibold">
              Time span{" "}
              <span className="text-gray-400 text-sm font-medium flex flex-wrap">
                {coursewithId?.time_span}
              </span>
            </h2>
          </div>

          {/* Repeat similar blocks for other course details */}
          <div className="flex items-center md:items-start justify-center gap-5 lg:border-r border-gray-300 px-10">
            <Image
              src="/images/webinar.png"
              alt="Time"
              className="w-10 h-10 object-cover"
              width={50}
              height={50}
            />
            <h2 className="flex flex-col items-start justify-center gap-2 text-base font-semibold">
              Total Lesson{" "}
              <span className="text-gray-400 text-sm font-medium flex flex-wrap">
                {coursewithId?.total_lesson}
              </span>
            </h2>
          </div>
          <div className="flex items-center md:items-start justify-center gap-5 lg:border-r border-gray-300 px-10">
            <Image
              src="/images/lesson.png"
              alt="Time"
              className="w-10 h-10 object-cover"
              width={50}
              height={50}
            />
            <h2 className="flex flex-col items-start justify-center gap-2 text-base font-semibold">
              Lesson Duration{" "}
              <span className="text-gray-400 text-sm font-medium flex flex-wrap">
                {coursewithId?.lesson_duration}
              </span>
            </h2>
          </div>
          <div className="flex items-center md:items-start justify-center gap-5 lg:border-r border-gray-300 px-10">
            <Image
              src="/images/start.png"
              alt="Time"
              className="w-10 h-10 object-cover"
              width={50}
              height={50}
            />
            <h2 className="flex flex-col items-start justify-center gap-2 text-base font-semibold">
              Skill Level{" "}
              <span className="text-gray-400 text-sm font-medium flex flex-wrap capitalize">
                {coursewithId?.course_label}
              </span>
            </h2>
          </div>
          <div className="flex items-center md:items-start justify-center gap-5 border-gray-300 px-10">
            <Image
              src="/images/translate.png"
              alt="Time"
              className="w-10 h-10 object-cover"
              width={50}
              height={50}
            />
            <h2 className="flex flex-col items-start justify-center gap-2 text-base font-semibold">
              Language
              <span className="text-gray-400 text-sm font-medium flex flex-wrap capitalize">
                {coursewithId?.language}
              </span>
            </h2>
          </div>
          {/* Repeat other blocks as necessary */}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsBanner;
