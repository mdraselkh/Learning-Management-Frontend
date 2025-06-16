import React from "react";

const Overview = () => {
  return (
    <div className="pt-8 flex flex-col items-start justify-between gap-8">
      <div>
        <h2 className="text-4xl text-black font-semibold mb-3 font-serif">
          Course Description
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
      <div>
        <h3 className="text-2xl font-semibold text-black mb-3 font-serif">Main features</h3>
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
      <div>
        <h3 className="text-2xl font-semibold text-black mb-3 font-serif">
          What is the targeted audience?
        </h3>
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

export default Overview;
