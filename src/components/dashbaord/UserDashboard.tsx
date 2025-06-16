"use client";
import React, { useState, useEffect } from "react";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { REQUIRED_ERROR } from "@/constant/constantClassName";
import Button from "@/components/ui/button/Button";
import { BACKEND_API } from "@/api";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getUserProfile } from "@/lib/redux/slices/loginPersonProfile";
import { setPageTitle } from "@/lib/redux/slices/appSlice";
import { FiEdit } from "react-icons/fi";

import toast, { Toaster } from "react-hot-toast";
import ConnectWithBankCard from "../misc/ConnectWithBankCard";

const FORM_INPUT_CLASS =
  "w-full h-10 text-base bg-white border-b border-gray-200 focus:border-gray-300  text-gray-600 outline-none   transition-all duration-500 ";
const FORM_INPUT_LABEL = " block w-full  text-sm font-medium text-gray-600";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const UserDashboard = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.user.user);
  const loggedInUserProfile = useAppSelector(
    (state) => state.userProfile.userProfile
  );
  const router = useRouter();
  //const [amount, setAmount] = useState<string>("");
  const [formData, setFormData] = useState({
    bankAccountNumber:
      loggedInUserProfile?.UserDetails?.[0]?.bankAccountNumber || "",
    routingNumber: loggedInUserProfile?.UserDetails?.[0]?.routingNumber || "",
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    setFormData({
      bankAccountNumber:
        loggedInUserProfile?.UserDetails?.[0]?.bankAccountNumber || "",
      routingNumber: loggedInUserProfile?.UserDetails?.[0]?.routingNumber || "",
    });
  }, [isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitBankdDetails = async () => {
    try {
      const id = loggedInUser?.userId;
      const payload = {
        id: id,
        email: loggedInUserProfile?.email,
        ...formData,
      };
      const token = loggedInUser?.token;
      //console.log("payload for bank details update",payload);

      const response = await axios.put(
        `${BACKEND_API}admin/user/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      console.log(" response of bank details update:", response.data);
      dispatch(getUserProfile());
      toast.success("Update bank details successfully");
      setIsEditMode(false);
    } catch (error) {
      console.log("error while update bank details", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(
            error.response.data.message || "Failed to update bank details"
          );
        } else {
          toast.error("Failed to update bank details");
        }
      } else {
        toast.error("Failed to update bank details");
      }
      setIsEditMode(false);
      setFormData({
        bankAccountNumber:
          loggedInUserProfile?.UserDetails?.[0]?.bankAccountNumber || "",
        routingNumber:
          loggedInUserProfile?.UserDetails?.[0]?.routingNumber || "",
      });
    }
  };

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="w-full">
      <Toaster />

      <div className="w-full max-w-xl p-6 mb-10 md:mb-16 bg-white rounded-xl border border-gray-200 shadow-md shrink-0 ">
        <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-x-10  gap-y-6 md:gap-y-8 ">
          <div className="w-full  flex flex-col  ">
            <h5 className="text-base font-semibold">Available Credit</h5>
            <span className="text-base font-medium text-gray-600 ">
              {" "}
              {USDollar.format(
                `${
                  loggedInUserProfile?.UserDetails?.[0]?.availableCredit || "0"
                }`
              )}
            </span>
          </div>
          <div className="w-full  flex flex-col  ">
            <h5 className="text-base font-semibold">Utilized Credit</h5>
            <span className="text-base font-medium text-gray-600 ">
              {" "}
              {USDollar.format(
                `${loggedInUserProfile?.UserDetails?.[0]?.utilizedCredit || 0}`
              )}
            </span>
          </div>
          <div className="w-full  flex flex-col  ">
            <h5 className="text-base font-semibold">Interest Rate</h5>
            <span className="text-base font-medium text-gray-600 ">
              {loggedInUserProfile?.UserDetails?.[0]?.interestRate != null
                ? `${loggedInUserProfile.UserDetails[0].interestRate}%`
                : "N/A"}
            </span>
          </div>
          <div className="w-full  flex flex-col ">
            <h5 className="text-base font-semibold">
              Assigned Sales Representive
            </h5>

            <span
              className="text-base font-medium text-gray-600 "
              style={{ textTransform: "capitalize" }}
            >
              {" "}
              {`${
                loggedInUserProfile?.UserDetails?.[0]?.assignedSalesRep || "NA"
              }`}
            </span>
          </div>

          <div className="w-full col-span-1 md:col-span-2   ">
            <button
              className="  inline-block  bg-primary hover:bg-primary text-center text-white px-4 py-2 rounded-md transition-all duration-500 no-underline cursor-pointer"
              onClick={() => {
                dispatch(setPageTitle("Request Loan"));
                router.push("/request-withdrawal");
              }}
            >
              Select Loan Amount
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-xl mb-10 md:mb-16">
        <div className="w-full flex  items-start sm:items-center justify-between gap-6 mb-6 ">
          <h1
            className=" text-xl   font-medium text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            Update Bank Details
          </h1>
          <button
            onClick={handleToggleEdit}
            className="flex items-center flex-nowrap gap text-gray-800 text-base font-medium  "
          >
            <FiEdit className=" mr-1.5  " />
            Edit
          </button>
        </div>
        <div className="w-full  bg-white border border-gray-200 px-6 py-8 rounded-xl shadow-md ">
          <div className="w-full mb-8">
            <label className={FORM_INPUT_LABEL}>Bank Account Number</label>
            <input
              type="text"
              name="bankAccountNumber"
              readOnly={!isEditMode}
              placeholder={
                loggedInUserProfile?.UserDetails?.[0]?.bankAccountNumber || ""
              }
              value={formData.bankAccountNumber}
              onChange={handleInputChange}
              className={FORM_INPUT_CLASS}
            />
            <span className={REQUIRED_ERROR}></span>
          </div>
          <div className="w-full">
            <label className={FORM_INPUT_LABEL}>Routing Number</label>
            <input
              type="text"
              name="routingNumber"
              placeholder={
                loggedInUserProfile?.UserDetails?.[0]?.routingNumber || ""
              }
              readOnly={!isEditMode}
              value={formData.routingNumber}
              onChange={handleInputChange}
              className={FORM_INPUT_CLASS}
            />
            <span className={REQUIRED_ERROR}></span>
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-8">
            {isEditMode && (
              <Button size="sm" onClick={handleSubmitBankdDetails}>
                Update
              </Button>
            )}
          </div>
        </div>
      </div>
      <ConnectWithBankCard />
    </div>
  );
};

export default UserDashboard;
