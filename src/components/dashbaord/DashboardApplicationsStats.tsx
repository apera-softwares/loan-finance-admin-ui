"use client";
import React from "react";
import {
  ApplicationPendingIcon,
  ApplicationApprovedIcon,
  ApplicationFundedIcon,
} from "@/icons";

const DashboardApplicationsStats = () => {
  return (
    <div className="grid grid-cols-1  sm:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
      {/* <!-- Metric Application Pending Start --> */}
      <div className="rounded-2xl  bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] ">
        <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-[#8280FF]/20 rounded-2xl lg:rounded-3xl dark:bg-gray-800 mb-6 md:mb-7 ">
          <ApplicationPendingIcon />
        </div>
        <div className="w-full">
          <div className="flex flex-col">
            <span className=" text-lg font-medium text-[#202224] dark:text-gray-400 mb-3">
              Pending Applications
            </span>
            <h4 className="font-semibold text-2xl md:text-3xl  text-[#8280FF]  dark:text-white/90">
              3,782
            </h4>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Application Pending End --> */}

      {/* <!-- Metric Application Approved Start --> */}
      <div className="rounded-2xl  bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] ">
        <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-[#FEC53D]/20 rounded-2xl lg:rounded-3xl dark:bg-gray-800 mb-6 md:mb-7 ">
          <ApplicationApprovedIcon />
        </div>
        <div className="w-full">
          <div className="flex flex-col">
            <span className="text-lg font-medium text-[#202224] dark:text-gray-400 mb-3">
              Approved Applications
            </span>
            <h4 className="font-semibold text-2xl md:text-3xl  text-[#FEC53D]  dark:text-white/90">
              5,359
            </h4>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>
       {/* <!-- Metric Application Approved End --> */}

        {/* <!-- Metric Application Funded Start --> */}
      <div className="rounded-2xl  bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] ">
        <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-[#4AD991]/20 rounded-2xl lg:rounded-3xl dark:bg-gray-800 mb-6 md:mb-7 ">
          <ApplicationFundedIcon />
        </div>
        <div className="w-full">
          <div className="flex flex-col">
            <span className="text-lg font-medium text-[#202224] dark:text-gray-400 mb-3">
              Funded Applications
            </span>
            <h4 className="font-semibold text-2xl md:text-3xl  text-[#4AD991]  dark:text-white/90">
              5,359
            </h4>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>
       {/* <!-- Metric Application Funded End --> */}


    </div>
  );
};

export default DashboardApplicationsStats;
