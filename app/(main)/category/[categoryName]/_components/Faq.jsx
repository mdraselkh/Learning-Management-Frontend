"use client";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Faq = () => {
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
    <div className="pt-8 flex flex-col items-start justify-between gap-8">
      <div>
        <h2 className="text-2xl md:text-4xl text-black font-semibold mb-4 font-serif">
          Frequently asked questions
        </h2>
        <p className="text-base text-gray-500">
          Have something on your mind? We’ve gathered the most common questions
          learners ask — and answered them all right here. From course content
          to access and certificates, find all the deets without needing to
          reach out. Still stuck? Don’t worry — you can always contact us
          directly. 🙌
        </p>
      </div>
      <div className="w-full mt-8 flex flex-col gap-5 justify-between">
        {faqs.map((faq, index) => (
          <div key={index} className="">
            <button
              className="w-full flex justify-between bg-teal-50 rounded items-center py-4 px-4 text-left focus:outline-none"
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
              className={`overflow-hidden transition-all duration-700 ${
                openQuestion === index ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {openQuestion === index && (
                <p className="text-gray-600 text-sm px-4  py-6">{faq.answer}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
