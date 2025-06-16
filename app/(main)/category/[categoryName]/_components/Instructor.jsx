import React from "react";
import memberImg1 from "/public/images/team1.png";
import memberImg2 from "/public/images/team2.png";
import memberImg3 from "/public/images/team3.png";
import memberImg4 from "/public/images/team4.png";
import TeamCard from "@/app/(main)/team/_components/TeamCard";

const Instructor = ({instructor}) => {


  return (
    <div className="pt-8 flex flex-col items-center md:items-start justify-between gap-8">
      <div>
        <h2 className="text-4xl text-black font-semibold mb-4 font-serif">
          Course instructor
        </h2>
        <p className="text-base text-gray-500">
          Our course instructors are experienced professionals who bring a
          wealth of knowledge and practical expertise to the classroom. With
          backgrounds in their respective fields, they are committed to
          providing high-quality education that combines theoretical concepts
          with real-world applications. Each instructor is dedicated to guiding
          you through the course, offering personalized support, and ensuring
          you gain the skills and confidence needed to succeed. Whether you're a
          beginner or looking to enhance your skills, our instructors are here
          to help you every step of the way, providing valuable insights and
          feedback to ensure your learning journey is a success.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10">
        {instructor.map((item) => (
          <div key={item.id}>
            <TeamCard
              name={item.name}
              // position={item.position}
              image={item.image_url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructor;
