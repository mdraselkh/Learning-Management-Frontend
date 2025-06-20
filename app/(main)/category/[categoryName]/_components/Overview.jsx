import React from "react";

const Overview = ({ coursewithId }) => {
  return (
    <div className="pt-8 flex flex-col items-start justify-between gap-8">
      <div>
        <h2 className="text-2xl md:text-4xl text-black font-semibold mb-3 font-serif">
          Course Description
        </h2>
        <p className="text-base text-gray-500">{coursewithId?.description}</p>
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 font-serif">
          Main features
        </h3>
        <ul className="list-disc text-gray-500 text-sm md:text-base flex flex-col px-4">
          {coursewithId?.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 font-serif">
          What is the targeted audience?
        </h3>
        <p className="text-sm md:text-base text-gray-500">
          {coursewithId?.target_audience}
        </p>
      </div>
    </div>
  );
};

export default Overview;
