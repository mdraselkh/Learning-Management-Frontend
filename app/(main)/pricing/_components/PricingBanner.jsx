"use client";
import Image from "next/image";
import React, { useState } from "react";
import icon1 from "/public/images/starter.png";
import icon2 from "/public/images/standard.png";
import icon3 from "/public/images/premium.png";
import PricingCard from "./PricingCard";

const PricingBanner = () => {
  const [activeTab, setActiveTab] = useState("monthly");

  const PricingData = [
    {
      id: 1,
      icon: icon1,
      title: "Basic Plan",
      subtitle: "Perfect for individuals or small teams",
      isPremium: false,
      plans: [
        {
          type: "monthly",
          price: "$14.99",
          discountPrice: "$9.99",
        },
        {
          type: "yearly",
          price: "$149.99",
          discountPrice: "$99.99",
        },
      ],
      features: [
        "Access to 10+ top courses",
        "Certification prep",
        "Customizable content",
        "AI-powered coding exercises",
        "Basic analytics and reports",
      ],
    },
    {
      id: 2,
      icon: icon2,
      title: "Standard Plan",
      subtitle: "Ideal for growing businesses",
      isPremium: false,
      plans: [
        {
          type: "monthly",
          price: "$29.99",
          discountPrice: "$24.99",
        },
        {
          type: "yearly",
          price: "$299.99",
          discountPrice: "$249.99",
        },
      ],
      features: [
        "Access to 50+ top courses",
        "Certification prep",
        "Customizable content",
        "AI-powered coding exercises",
        "Detailed analytics and adoption reports",
        "Priority email support",
      ],
    },
    {
      id: 3,
      icon: icon3,
      title: "Premium Plan",
      subtitle: "Best for enterprises and large teams",
      isPremium: true,
      plans: [
        {
          type: "monthly",
          price: "$49.99",
          discountPrice: "$39.99",
        },
        {
          type: "yearly",
          price: "$499.99",
          discountPrice: "$399.99",
        },
      ],
      features: [
        "Access to all courses",
        "Certification prep",
        "Customizable content",
        "AI-powered coding exercises",
        "Advanced analytics and adoption reports",
        "Dedicated account manager",
        "24/7 priority support",
      ],
    },
  ];

  return (
    <div className="relative w-full mb-28">
      {/* Background Image */}
      <Image
        src="/images/herobg.png"
        alt="Hero Background"
        className="z-0 w-full h-[2500px] sm:h-[2000px] xl:h-[1300px] object-cover"
        width={500}
        height={500}
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 z-5"></div>

      {/* Hero Section */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10">
        <div className="container mx-auto  max-w-7xl flex flex-col items-center md:items-start justify-center gap-5 px-8 xl:px-0">
          <h3 className="text-white font-semibold text-xs md:text-base uppercase">
            Pricing
          </h3>
          <h1 className=" text-3xl md:text-5xl lg:text-6xl text-white font-bold max-w-3xl">
            Flexible pricing plan for everyone
          </h1>
          <div className="mt-5 flex items-center justify-center py-2 px-3 gap-1 rounded-l-full rounded-r-full bg-gray-500 transition-colors duration-500">
            <button
              className={`font-medium uppercase py-1 px-4 ${
                activeTab === "monthly"
                  ? "text-black  rounded-l-full rounded-r-full bg-yellow-500"
                  : "text-gray-800 bg-transparent"
              }`}
              onClick={() => setActiveTab("monthly")}
            >
              Monthly
            </button>
            <button
              className={`font-medium uppercase gap-3 flex items-center py-1 px-4 ${
                activeTab === "yearly"
                  ? "text-black  rounded-l-full rounded-r-full bg-yellow-500"
                  : "text-gray-800 bg-transparent"
              }`}
              onClick={() => setActiveTab("yearly")}
            >
              Yearly{" "}
              <span className="text-[10px] p-1 border border-black rounded-l-full rounded-r-full">
                save 20%
              </span>
            </button>
          </div>
        </div>
        <div className="container mx-auto  max-w-7xl grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-10 mt-8 px-4 xl:px-0 place-items-center">
        {PricingData.map((item, index) => {
          // Filter plan based on activeTab
          const selectedPlan = item.plans.find(
            (plan) => plan.type === activeTab
          );

          return (
            <div key={index}>
              <PricingCard
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                plans={[selectedPlan]} // Pass only the selected plan
                features={item.features}
                isPremium={item.isPremium}
              />
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default PricingBanner;
