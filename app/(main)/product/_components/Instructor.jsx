import React from "react";
import TeamCard from "../../team/_components/TeamCard";
import memberImg1 from "/public/images/team1.png";
import memberImg2 from "/public/images/team2.png";
import memberImg3 from "/public/images/team3.png";
import memberImg4 from "/public/images/team4.png";

const Instructor = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      position: "Instructor",
      image: memberImg1,
    },
    {
      id: 2,
      name: "John Doe",
      position: "Instructor",
      image: memberImg2,
    },
    {
      id: 3,
      name: "John Doe",
      position: "Instructor",
      image: memberImg3,
    },
    {
      id: 4,
      name: "John Doe",
      position: "Instructor",
      image: memberImg4,
    },
  ];

  return (
    <div className="pt-8 flex flex-col items-center md:items-start justify-between gap-8">
      <div>
        <h2 className="text-4xl text-black font-semibold mb-4 font-serif">
          Course instructor
        </h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10">
        {teamMembers.map((item) => (
          <div key={item.id}>
            <TeamCard
              name={item.name}
              position={item.position}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructor;
