import Image from "next/image";
import React from "react";

const LessonSection = ({ lesson }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-8">
      <div>
        <h2 className="text-4xl text-black font-semibold mb-6 font-serif">
          {lesson.title}
        </h2>
        <h3 className="text-lg font-semibold mb-3">{lesson.subtitle}</h3>
        <p className="text-base text-gray-500">{lesson.description}</p>
      </div>
      {/* Responsive Video Container */}
      <div className="w-full h-[300px] lg:h-[420px] max-w-4xl aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
        <video
          src={lesson.video_url}
          title="Lesson Video"
          controls
          className="w-full h-full"
        ></video>
      </div>
      {/* <div>
        <h3 className="text-lg font-semibold text-black mb-3 font-serif">Main features</h3>
        <ul className="list-disc text-gray-500 text-base flex flex-col px-4">
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
        </ul>
      </div> */}
      {/* <Image
        src="/images/lessonImg.png"
        alt="Lesson Image"
        width={500}
        height={500}
        className="w-full object-cover"
      />
      <p className="text-base text-gray-500 mb-4">
        {lesson.description}
      </p>

      <div>
        <h3 className="text-lg font-semibold mb-3">Lesson Summary</h3>
        <p className="text-base text-gray-500">{lesson.description}</p>
      </div> */}
    </div>
  );
};

export default LessonSection;
