"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import { fetchReferralById } from "@/lib/redux/slices/referralSlice";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "@/components/common/Spinner";
import ApplicantDetailsCard from "@/components/applications/ApplicantDetailsCard";
import OwnerDetailsCard from "@/components/applications/OwnerDetailsCard";
import BusinessDetailsCard from "@/components/applications/BusinessDetailsCard";
import BeneficialOwnerDetailsCard from "@/components/applications/BeneficialOwnerDetailsCard";



// const LABEL = "text-sm  text-gray-500 mb-2";
// const CONTENT = "text-sm font-medium text-gray-800";
// const CONTAINER_CLASS = "w-full border-b pb-1.5 ";



const ApplicationDetails = () => {

  const params = useParams();
  const applicationId = params?.applicationId as string;  
  const dispatch = useAppDispatch();
  const [loading, setLoding] = useState<boolean>(true);


  useEffect(() => {
    getReferralById();
  }, [dispatch]);

  const getReferralById = async () => {
    try {
      await dispatch(fetchReferralById(applicationId)).unwrap();
      //toast.success("Get application details successfully");
    } catch (error: any) {
      console.error("Error fetching application details:", error);
      toast.error(
        typeof error === "string"
          ? error
          : "Failed to fetch applications details"
      );
    } finally {
      setLoding(false);
    }
  };

  return (
    <div className="w-full">
      <Toaster />
      {loading ? (
        <Spinner />
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
            Application details
          </h3>
          <div className="w-full space-y-6">
            <ApplicantDetailsCard/>
            <OwnerDetailsCard/>
            <BusinessDetailsCard/>
            <BeneficialOwnerDetailsCard/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetails;
