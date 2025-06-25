"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import Loading from "@/app/loading";

const SocialLoginPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { expires: 1 });
      router.push("/student-dashboard");
    }
  }, [token, router]);

  return <Loading />;
};

export default SocialLoginPage;
