"use client";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { X } from "lucide-react";
import React, { use, useRef, useState } from "react";
import UserForm from "../../_components/UserForm";

const CreateUser = ({ params }) => {
  // const role = params.role || "student";
  const unwrappedParams = use(params);
  const { role } = unwrappedParams || "student";

  return (
    <div>
      <UserForm role={role} />
    </div>
  );
};

export default CreateUser;
