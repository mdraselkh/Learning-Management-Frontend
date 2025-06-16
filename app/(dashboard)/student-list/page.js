import React from "react";
import StudentListTable from "./_components/StudentListTable";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  return (
    <div className="container mx-auto">  
      <StudentListTable />
    </div>
  );
};

export default page;
