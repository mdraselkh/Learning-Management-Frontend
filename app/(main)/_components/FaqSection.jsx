"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I enroll in an online course?",
      answer:
        "To enroll in an online course, visit the course page, click 'Enroll', and follow the instructions to sign up.",
    },
    {
      question: "Are there any prerequisites for enrolling in online courses?",
      answer:
        "Some courses may have prerequisites. Check the course description for more details.",
    },
    {
      question: "What are the technical requirements for online learning?",
      answer:
        "You'll need a device with an internet connection, a browser, and, in some cases, specific software mentioned in the course.",
    },
    {
      question: "What if I encounter technical difficulties?",
      answer:
        "Contact support via email or the help center for assistance with technical issues.",
    },
    {
      question: "Are there live classes, or can I learn at my own pace?",
      answer:
        "Some courses are self-paced, while others include live classes. Check the course details for more information.",
    },
  ];
  return (
    <div className="container mx-auto max-w-7xl rounded bg-gradient-to-b via-teal-50 from-teal-50 to-transparent p-8 md:py-16 md:px-24 flex items-center justify-between flex-col gap-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-20">
        <Image
          src="/images/fqaImg.png"
          alt=""
          className="w-48 h-48  "
          width={500}
          height={500}
        />
        <div className="flex flex-col items-center justify-center gap-4 md:ml-20">
          <h3 className="texxt-black text-sm md:text-base uppercase">
            Contact Us
          </h3>
          <h1 className="font-bold text-3xl lg:text-5xl max-w-lg font-serif text-black">
            {" "}
            Frequently asked questions
          </h1>
        </div>
      </div>
      <div className=" w-full lg:px-24 pb-8 md:py-10 ">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b  border-gray-200">
            <button
              className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
              onClick={() => toggleQuestion(index)}
            >
              <span className="text-lg font-semibold text-gray-900">
                {faq.question}
              </span>
              <span className="text-xl text-gray-800">
                {openQuestion === index ? (
                  <AiOutlineMinus className="font-semibold" />
                ) : (
                  <AiOutlinePlus className="font-semibold" />
                )}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-1000 ${
                openQuestion === index ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {openQuestion === index && (
                <p className="text-gray-600 text-sm mb-6">{faq.answer}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
