import Image from "next/image";
import React from "react";

const LessonSection = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-8">
      <div>
        <h2 className="text-4xl text-black font-semibold mb-6 font-serif">
        Introduction to angular and single page applications
        </h2>
        <h3 className="text-lg font-semibold mb-3">Introduction</h3>
        <p className="text-base text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
          architecto cupiditate perferendis laborum harum voluptas voluptatem
          quaerat eius? Fugit illum sed ad consectetur. Alias, tenetur.
          Consequuntur in officiis sequi quidem ratione corporis neque, adipisci
          eaque beatae maiores exercitationem. Accusantium adipisci ut incidunt
          minima, facilis mollitia vel libero consequuntur consectetur itaque
          dolor repudiandae vitae rerum tempore? Fugiat corporis earum
          voluptatem dolorem!
        </p>
      </div>
      {/* Responsive Video Container */}
      <div className="w-full h-[300px] lg:h-[420px] max-w-4xl aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube Video Tutorial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div>
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
      </div>
      <Image src='/images/lessonImg.png' alt="" width={500} height={500} className="w-full object-cover"/>
      <p className="text-base text-gray-500 mb-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
          architecto cupiditate perferendis laborum harum voluptas voluptatem
          quaerat eius? Fugit illum sed ad consectetur. Alias, tenetur.
          Consequuntur in officiis sequi quidem ratione corporis neque, adipisci
          eaque beatae maiores exercitationem. Accusantium adipisci ut incidunt
          minima, facilis mollitia vel libero consequuntur consectetur itaque
          dolor repudiandae vitae rerum tempore? Fugiat corporis earum
          voluptatem dolorem!
        </p>

        <div>
        <h3 className="text-lg font-semibold mb-3">Lesson Summary</h3>
        <p className="text-base text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
          architecto cupiditate perferendis laborum harum voluptas voluptatem
          quaerat eius? Fugit illum sed ad consectetur. Alias, tenetur.
          Consequuntur in officiis sequi quidem ratione corporis neque, adipisci
          eaque beatae maiores exercitationem. Accusantium adipisci ut incidunt
          minima, facilis mollitia vel libero consequuntur consectetur itaque
          dolor repudiandae vitae rerum tempore? Fugiat corporis earum
          voluptatem dolorem!
        </p>
        </div>

    </div>
  );
};

export default LessonSection;
