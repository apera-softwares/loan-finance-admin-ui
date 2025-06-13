"use client";
import React from "react";
import { useAppSelector } from "@/lib/redux/hooks";

const LABEL = "text-sm  text-gray-500 mb-2";
const CONTENT = "text-sm font-medium text-gray-800";
const CONTAINER_CLASS = "w-full border-b pb-1.5 ";

const ApplicantDetailsCard = () => {
  const { referralDetails: applicationData } = useAppSelector(
    (state) => state.referral
  );
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03] ">
      <h3 className="w-full  text-base font-semibold mb-5 text-gray-800 dark:text-white/90 ">
        Applicant Details
      </h3>
      <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-6 ">
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>First Name</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.firstName || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Last Name</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.lastName || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Phone Number</p>
          <p className={`${CONTENT}`}>{`${applicationData?.phone || "NA"}`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Email</p>
          <p className={`${CONTENT}`}>{`${applicationData?.email || "NA"}`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Role</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.applicantRole || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Time In Business (Months)</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.timeInBusiness || "NA"
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailsCard;
