"use client";
import React, { useState } from "react";
import FaqBanner from "./FaqBanner";
import { IoIosArrowRoundForward } from "react-icons/io";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState("enrollment");

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const FaqData = [
    {
      id: 1,
      faqCategory: "enrollment",
      title: "Enrollment and registration",
      faq: [
        {
          question: "How do I enroll in an online course?",
          answer:
            "To enroll in an online course, visit the course page, click 'Enroll', and follow the instructions to sign up.",
        },
        {
          question:
            "Are there any prerequisites for enrolling in online courses?",
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
      ],
    },
    {
      id: 2,
      faqCategory: "technical",
      title: "Technical requirements",
      faq: [
        {
          question: "What equipment do I need for online learning?",
          answer:
            "You’ll need a computer or mobile device with internet access and a web browser.",
        },
        {
          question: "Do I need specific software for the courses?",
          answer:
            "Some courses may require software like Zoom or coding tools. These will be listed in the course details.",
        },
        {
          question: "Can I access the course on my mobile device?",
          answer:
            "Yes, our platform is mobile-friendly, allowing you to learn on the go.",
        },
        {
          question: "What if I experience technical issues?",
          answer:
            "Our support team is available 24/7 to assist with any technical problems.",
        },
        {
          question: "Is a webcam required for online courses?",
          answer:
            "A webcam is only needed for courses with live sessions or proctored exams.",
        },
      ],
    },
    {
      id: 3,
      faqCategory: "assesments",
      title: "Assesment and grading",
      faq: [
        {
          question: "How do I enroll in an online course?",
          answer:
            "To enroll in an online course, visit the course page, click 'Enroll', and follow the instructions to sign up.",
        },
        {
          question:
            "Are there any prerequisites for enrolling in online courses?",
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
      ],
    },
    {
      id: 4,
      faqCategory: "support",
      title: "Communication and support",
      faq: [
        {
          question: "How do I enroll in an online course?",
          answer:
            "To enroll in an online course, visit the course page, click 'Enroll', and follow the instructions to sign up.",
        },
        {
          question:
            "Are there any prerequisites for enrolling in online courses?",
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
      ],
    },
    {
      id: 5,
      faqCategory: "certificates",
      title: "Certificates and degrees",
      faq: [
        {
          question: "Will I get a certificate after completing the course?",
          answer:
            "Yes, you will receive a certificate upon successful course completion.",
        },
        {
          question: "Are the certificates recognized internationally?",
          answer:
            "Our certificates are industry-recognized but may vary in international recognition.",
        },
        {
          question: "How can I share my certificate?",
          answer:
            "Certificates can be shared on LinkedIn or downloaded as a PDF for resumes.",
        },
        {
          question: "Is there an extra fee for the certificate?",
          answer:
            "No, the certificate cost is included in the course fee unless specified otherwise.",
        },
        {
          question: "Can I verify my certificate online?",
          answer:
            "Yes, certificates include a unique ID for online verification.",
        },
      ],
    },
  ];

  return (
    <div>
      <FaqBanner />

      {/* Tab Navigation */}
      <div className="container mx-auto max-w-7xl py-10 md:py-28 flex flex-col md:flex-row items-center justify-between gap">
        <div className="flex flex-col justify-center mb-8 w-full md:w-auto px-8">
          {FaqData.map((item) => (
            <button
              key={item.id}
              className={`px-10 py-6 border-b  ${
                item.faqCategory === activeTab
                  ? "bg-teal-950 text-white"
                  : "bg-teal-50 text-gray-500"
              }`}
              onClick={() => setActiveTab(item.faqCategory)}
            >
              <h3 className="flex items-center justify-between gap-2">
                {item.title} <IoIosArrowRoundForward />
              </h3>
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        {FaqData.filter((item) => item.faqCategory === activeTab).map(
          (filteredItem) => (
            <div key={filteredItem.id} className="w-full md:w-2/3 px-8 xl:px-0">
              {filteredItem.faq.map((faqItem, index) => (
                <div key={index} className="border-b border-gray-200 mb-4">
                  <button
                    className="w-full flex justify-between items-center py-1 md:py-3 text-left focus:outline-none"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span className="text-lg font-semibold text-gray-900">
                      {faqItem.question}
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
                    className={`overflow-hidden transition-all duration-300 ${
                      openQuestion === index ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    {openQuestion === index && (
                      <p className="text-gray-600 text-sm mt-2">
                        {faqItem.answer}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FaqPage;
