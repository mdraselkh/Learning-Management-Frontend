"use client";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const RichEditor = ({ placeholder, value, onChange }) => {
  // Dynamically load ReactQuill for client-side rendering
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      placeholder={placeholder || "Write something..."}
      value={value}
      onChange={onChange}
    />
  );
};

export default RichEditor;
