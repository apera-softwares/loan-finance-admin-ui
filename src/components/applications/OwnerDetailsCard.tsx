"use client";
import React from "react";
import { useAppSelector } from "@/lib/redux/hooks";

const LABEL = "text-sm  text-gray-500 mb-2";
const CONTENT = "text-sm font-medium text-gray-800";
const CONTAINER_CLASS = "w-full border-b pb-1.5 ";

const OwnerDetailsCard = () => {
  const { referralDetails: applicationData } = useAppSelector(
    (state) => state.referral
  );
  return (
    <div className=" w-full rounded-xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03] ">
      <h3 className="w-full mb-5 text-base font-semibold text-gray-800 dark:text-white/90 ">
        Owner Details
      </h3>
      <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-6 ">
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Job Title</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.jobTitle || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Is Owner</p>
          <p className={`${CONTENT}`}>
            {applicationData?.isOwner ? "YES" : "NO"}
          </p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Ownership Type</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.ownershipType || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Ownership Percentage</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.ownershipPercentage || "NA"
          }`}</p>
        </div>

        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>First Name</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.ownerFirstName || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Last Name</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.ownerLastName || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Phone Number</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.ownerInformationMobileNumber || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Email</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.ownerInformationEmail || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Date Of Birth</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.ownerDateOfBirth || "NA"
          }`}</p>
        </div>

        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Address</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.ownerAddress || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>City</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.ownerCity
?.city || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>State</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.ownerState?.name || "NA"
          }`}</p>
        </div>

        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Zipcode</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.OwnerZipCode || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Social Security Number</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.socialSecurityNumber || "NA"
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerDetailsCard;
