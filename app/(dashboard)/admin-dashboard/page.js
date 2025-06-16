import React from "react";
import DashboardStats from "../_components/DashboardStats";
import TransactionListTable from "../transactions/_components/TransactionListTable";
import HighestRatedCourses from "../_components/HighestRatedCourse";
import RevenueChart from "../_components/RevenueChart";

const page = () => {
  return (
    <div>
      <DashboardStats />
      <div className="my-5 flex items-center gap-10">
        <div className="w-[45%]">
          <RevenueChart />
        </div>
        <div className="w-[55%]">
          <HighestRatedCourses isDashbaord={true} />
        </div>
      </div>
      <div className="my-5">
        <TransactionListTable isDashboard={true} />
      </div>
    </div>
  );
};

export default page;
