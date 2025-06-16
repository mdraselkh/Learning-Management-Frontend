import React from "react";
import icon1 from "/public/images/knowledge.png";
import icon2 from "/public/images/money.png";
import icon3 from "/public/images/graduation.png";
import icon4 from "/public/images/quality.png";
import Image from "next/image";

const WhyWeAre = () => {
  const ContentData = [
    {
      id: 1,
      icon: icon1,
      title: "Learn anything",
      description:
        "Access courses designed to boost your skills and unlock new opportunities.",
    },
    {
      id: 2,
      icon: icon2,
      title: "Save money",
      description:
        "Affordable learning paths and free resources to keep your wallet happy.",
    },
    {
      id: 3,
      icon: icon3,
      title: "Flexible courses",
      description:
        "Learn at your own pace with courses that fit your schedule and lifestyle.",
    },
    {
      id: 4,
      icon: icon4,
      title: "Unlimited certificates",
      description:
        "Earn certificates on every course to showcase your achievements and grow your profile.",
    },
  ];

  return (
    <div className="bg-slate-100 py-4">
      <div className="flex flex-col items-center justify-between container mx-auto px-4 xl:px-0 gap-5 lg:gap-7">
        <h2 className="uppercase  w-full text-sm lg:text-base text-black text-center font-semibold font-sans">
          Why We Are
        </h2>
        <h1 className="text-2xl lg:text-4xl font-semibold text-center font-serif">
          {" "}
          Elevate your professional journey
        </h1>
        <p className="text-gray-400 px-4 text-sm md:text-base max-w-3xl text-center">
          We’re all about empowering students to level up their skills and
          giving instructors the tools to share their expertise — creating a
          space where learning and teaching thrive together.
        </p>
      </div>
      <div className="container mx-auto max-w-7xl mt-6 lg:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0 py-8">
        {ContentData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center gap-5"
          >
            <Image src={item.icon} alt="" width={50} height={50} className="" />
            <h3 className="text-lg font-bold font-serif">{item.title}</h3>
            <p className="text-gray-400 text-sm md:text-base text-center px-8 lg:p-4">
              {" "}
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyWeAre;
