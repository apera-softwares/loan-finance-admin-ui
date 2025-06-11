"use client";
import React from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { UserProfile } from "../../icons/index";

interface UserAddEditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  applicationData: any;
}

const LABEL = "text-sm  text-gray-500 mb-2";
const CONTENT = "text-sm font-medium text-gray-800";
const CONTAINER_CLASS = "w-full border-b pb-3 ";

const ViewApplicationDetailsModal: React.FC<UserAddEditModalProps> = ({
  isOpen,
  closeModal,
  applicationData,
}) => {
  const handleModalClose = () => {
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      className="max-w-[800px] px-6 pb-8 pt-10 lg:px-10 "
    >
      <div className="w-full">
        <div className="w-full flex items-center mb-6 md:mb-8 ">
          <span className=" flex justify-center items-center rounded-full">
            <UserProfile />
          </span>
          <div className="ml-5 md:ml-6 w-full">
            <h5 className="font-semibold text-gray-800 text-xl sm:text-2xl  dark:text-white/90">
              Application Details
            </h5>
          </div>
        </div>

        <div className="w-full">
          <div className="max-h-[320px] overflow-y-auto ">
            <div className="w-full grid grid-cols-1  lg:grid-cols-2 gap-6 ">
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Applicant First Name</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.firstName || ""
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Applicant Last Name</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.lastName || ""
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Applicant Phone Number </p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.phone || ""
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Applicant Email Address</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.email || ""
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Applicant Role</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.applicantRole || "NA"
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Owner First Name</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.ownerFirstName || "NA"
                }`}</p>
              </div>

              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Owner Last Name</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.ownerLastName || "NA"
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Owner Phone Number </p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.OwnerInformationMobileNumber || "NA"
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Owner Email Address</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.OwnerInformationEmail || "NA"
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Owner Address</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.OwnerAddress || "NA"
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Business Tenure (Months)</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.timeInBusiness || "NA"
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Business Annual Revenue</p>
                <p className={`${CONTENT}`}>
                  {" "}
                  {applicationData?.annualRevenue
                    ? `$ ${applicationData?.annualRevenue}`
                    : "NA"}
                </p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Business Last 12 Months Revenue</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.revenueLast12Months || "NA"
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Business Name</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.businessName || "NA"
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Credit Score</p>
                <p className={`${CONTENT}`}>{`${
                  applicationData?.creditScore || "NA"
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Amount Needed</p>
                <p className={`${CONTENT}`}>
                  {applicationData?.amountNeeded
                    ? `$ ${applicationData?.amountNeeded}`
                    : "NA"}
                </p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Address</p>
                <p className={`${CONTENT}`}>
                  {`${applicationData?.address || "NA"}`}
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
                  applicationData?.OwnershipPercentage || "NA"
                }`}</p>
              </div>
              <div className={`${CONTAINER_CLASS}`}>
                <p className={`${LABEL}`}>Has Outstanding Debt</p>
                <p className={`${CONTENT}`}>
                  {applicationData?.hasOutstandingDebt ? "YES" : "NO"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end w-full gap-3 mt-8 lg:mt-10">
            <Button
              size="sm"
              variant="outline"
              onClick={handleModalClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewApplicationDetailsModal;
