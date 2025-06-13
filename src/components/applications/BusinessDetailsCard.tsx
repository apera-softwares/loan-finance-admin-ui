"use client";
import React from "react";
import { useAppSelector } from "@/lib/redux/hooks";

const LABEL = "text-sm  text-gray-500 mb-2";
const CONTENT = "text-sm font-medium text-gray-800";
const CONTAINER_CLASS = "w-full border-b pb-1.5 ";

const BusinessDetailsCard = () => {
  const { referralDetails: applicationData } = useAppSelector(
    (state) => state.referral
  );
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03] ">
      <h3 className="w-full mb-5 text-base font-semibold text-gray-800 dark:text-white/90 ">
        Business Details
      </h3>
      <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-6 ">
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Business Name</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.businessName || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Legal Business Name</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.legalNameOfBusiness || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Company Legal Structure</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.companyLegalStructure || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Is Franchise</p>
          <p className={`${CONTENT}`}>
            {applicationData?.isFranchise ? "YES" : "NO"}
          </p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Industry</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.industry?.name || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Sub Industry</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.subIndustry?.name || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Date Of Business Started</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.dateOfBusinessStarted || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>DBA Name</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.dbaName || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Amount Needed</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.amountNeeded|| "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Annual Revenue</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.annualRevenue || "NA"
          }`}</p>
        </div>

        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Business Revenue Of Last 12 Months</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.revenueLast12Months || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Business Expensess Of Last 12 Months</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.expensesLast12Months || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Tax Indentification</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.taxIdentification || "NA"
          }`}</p>
        </div>

        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Tax Indentification Number</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.taxIdentificationNumber || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Accept Credit Card</p>
          <p className={`${CONTENT}`}>
            {applicationData?.acceptsCreditCards ? "YES" : "NO"}
          </p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Has Outstanding Debt</p>
          <p className={`${CONTENT}`}>
            {applicationData?.hasOutstandingDebt ? "YES" : "NO"}
          </p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Address</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.ownerAddress || "NA"
          }`}</p>
        </div>
        {/* <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>City</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.jobTitle || "NA"
          }`}</p>
        </div>
        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>State</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.jobTitle || "NA"
          }`}</p>
        </div> */}

        <div className={`${CONTAINER_CLASS}`}>
          <p className={`${LABEL}`}>Zipcode</p>
          <p className={`${CONTENT}`}>{`${
            applicationData?.businessZipCode || "NA"
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsCard;
