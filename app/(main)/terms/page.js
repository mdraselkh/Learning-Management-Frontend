"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TermsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");

  console.log(searchParams);


  useEffect(() => {
    const tab = searchParams.get("tab");
    console.log(tab);
    if (tab==="terms-of-use") {
      setActiveTab("terms");
    } else if (tab==="privacy") {
      setActiveTab("privacy");
    } else {
      setActiveTab("");
    }
  }, [searchParams]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    router.push(`/terms?${tab === "terms" ? "terms-of-use" : "privacy"}`);
  };

  return (
    <div className="  bg-teal-950 h-screen pt-24 text-gray-800">
      {activeTab === "" && (
        <div className="w-full bg-white h-full ">
          <div className="max-w-7xl mx-auto container p-10">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Welcome to Our Legal Zone
            </h1>
            <p className="text-gray-700 mb-6 text-center">
              Here you can find our Terms of Use and Privacy Policy. These
              documents explain how we operate, how we protect your data, and
              what you agree to by using LearnCraft.
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleTabClick("terms")}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Terms of Use
              </button>
              <button
                onClick={() => handleTabClick("privacy")}
                className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
              >
                View Privacy Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "terms" && (
        <div className="w-full bg-white h-full ">
          <div className="max-w-7xl mx-auto container p-10">
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Terms of Use</h1>
              {/* <p>Effective Date: 16 June 2025</p> */}
              <p>
                Welcome to LearnCraft. By accessing or using our services, you
                agree to be bound by these Terms. If you do not agree, please do
                not use the platform.
              </p>

              <h2 className="text-lg font-semibold">1. Accounts</h2>
              <p>
                Users must register with valid credentials. Only one active
                session is allowed per user. Sharing login details is strictly
                prohibited.
              </p>

              <h2 className="text-lg font-semibold">2. Video Content</h2>
              <p>
                Right-click and video downloads are disabled. Recording and
                redistributing video content is a violation of copyright law.
              </p>

              <h2 className="text-lg font-semibold">3. Content Protection</h2>
              <p>
                Screenshots and screen recordings may be blocked. Legal action
                may be taken against unauthorized use or sharing.
              </p>

              <h2 className="text-lg font-semibold">4. Termination</h2>
              <p>
                We reserve the right to terminate accounts that violate our
                terms without notice.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "privacy" && (
        <div className="w-full bg-white h-full ">
          <div className="max-w-7xl mx-auto container p-10">
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Privacy Policy</h1>

              <p>
                At LearnCraft, we respect your privacy. This Privacy Policy
                outlines how we collect, use, and protect your personal
                information.
              </p>

              <h2 className="text-lg font-semibold">
                1. Information We Collect
              </h2>
              <ul className="list-disc list-inside ml-4">
                <li>Name, email, IP address, and login activity</li>
                <li>Course progress and purchase history</li>
                <li>Technical information like browser type, device, etc.</li>
              </ul>

              <h2 className="text-lg font-semibold">2. Use of Information</h2>
              <p>
                We use your data to deliver personalized learning experiences,
                process payments, and ensure platform security.
              </p>

              <h2 className="text-lg font-semibold">3. Sharing</h2>
              <p>
                We do not share personal data with third parties except for
                payment processors and service providers involved in course
                delivery.
              </p>

              <h2 className="text-lg font-semibold">4. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your data.
                Contact support@learncraft.com to exercise these rights.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
