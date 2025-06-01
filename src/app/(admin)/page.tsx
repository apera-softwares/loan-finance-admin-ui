"use client"
import React, { useState, useRef, useEffect } from "react";
import CommonHeading from "@/components/common/CommonHeading";
import {  REQUIRED_ERROR } from "@/constant/constantClassName";
import Button from "@/components/ui/button/Button";
import { BACKEND_API } from "@/api";
import axios, { AxiosError } from "axios";
import { useAppDispatch,useAppSelector } from "@/lib/redux/hooks";
import { getUserProfile } from "@/lib/redux/slices/loginPersonProfile";

import toast,{ Toaster } from "react-hot-toast";


const FORM_INPUT_CLASS = "w-full h-10 text-base bg-white border-b border-gray-200 focus:border-gray-300  text-gray-600 outline-none   transition-all duration-500 " ;
const FORM_INPUT_LABEL = " block w-full  text-sm font-medium text-gray-600";
export default function Dashboard() {

  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state)=>state.user.user);
  const loggedInUserProfile = useAppSelector((state)=>state.userProfile.userProfile);
  const [amount,setAmount] = useState<string>("");
  const [ammountError,setAmountError] = useState("");
  const [formData,setFormData]=useState({
    bankAccountNumber:"",
    routingNumber:"",
  }) 


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmitBankdDetails = async ()=> {
  try {

   const payload = {...formData};
   const token = loggedInUser?.token;
    const response = await axios.put(
      `${BACKEND_API}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
           'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    console.log(" response of bank details update:", response.data);
    toast.success("Update bank details successfully");
  } catch (error) {
    console.log("error while withdraw fund");
    toast.error("Failed to update bank details");
  
  }
};

const handleWithdrawFund = async ()=> {
  try {

   if(!validateAmount()) return ;
   const token = loggedInUser?.token;
   const payload = {
    amount:parseFloat(amount)||0
   };
   console.log("payload for amoutn withdraw",payload);

    const response = await axios.put(
      `${BACKEND_API}user/available-credit/withdraw`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
           'ngrok-skip-browser-warning': 'true',
        },
      }
    );
     console.log("resonse of fund withdraw",response);
     dispatch(getUserProfile());
    toast.success("Fund widhdraw successfully");
    setAmount("");
  } catch (error) {

    console.log("error while withdraw fund",error);

     if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(error.response.data.message||"Failed to withdraw fund" )
      } else {
        toast.error("Failed to withdraw fund" )
      }
    } else {
     toast.error("Failed to withdraw fund" )
    }

  
  }
};


function validateAmount(){
  const numericAmount = parseInt(amount);
  const availableCredit = loggedInUserProfile?.UserDetails?.[0]?.availableCredit||0;

  if (!amount.trim()) {
    
    setAmountError("Enter amount");
    return false;
  }


  if (numericAmount <= 0) {
   
    setAmountError("Amount must be greater than zero ")
    return false;
  }

  if (numericAmount > availableCredit) {
    setAmountError("Amount cannot exceed available credit.")
    return false;
    

  }
  
  setAmountError("");
  return true;
}



console.log("loggedinuser dashboard page",loggedInUser);
console.log("loggedINuserprofile dashboardpage",loggedInUserProfile);
console.log("amount error",ammountError);
console.log("amont type",typeof parseInt(amount),"type of avalalble credit",typeof loggedInUserProfile?.UserDetails?.[0]?.availableCredit)

  return (

    <div className="w-full">
      <Toaster/>



        {/* Top Bar: Left (Heading), Right (Search + Actions) */}
        <div className="w-full  mb-20 ">
            <div className="w-full flex flex-col lg:flex-row items-start justify-start lg:justify-between  gap-6  mb-6">
                  <div className=" w-full lg:w-1/2 "  >
                    <CommonHeading
                    pageTitle="Dashboard"
                   
                      />
                   </div>

            {/* Right: Actions */}
            <div className="w-full lg:w-1/2 flex flex-wrap justify-start lg:justify-end items-center gap-3  ">
              <div className="flex flex-col items-end font-semibold text-lg ">
                <span className=" ">
                  Available Credit
                </span>
                <span className="">
                  {
                    `${loggedInUserProfile?.UserDetails?.[0]?.availableCredit||"0"}`

                  }
                </span>
              </div>

            </div>
            </div>
            <div className="max-w-sm p-6 bg-white rounded-xl border border-gray-100 shadow-md">

            <div className="w-full mb-6">
              <label className="block w-full text-lg font-medium mb-1">
                Withdraw Fund 
              </label>
              <input type="text" placeholder="Enter amount" className="w-40 h-10 px-2 border-b border-gray-200 focus:border-gray-300   outline-none transition-all duration-500 "

              value={amount}
              onChange={(e)=>{

                    const value = e.target.value;
                    // Allow only digits (optional: allow empty string too)
                    if (/^\d*$/.test(value)) {
                    setAmount(value);
                  }

              }}
              
              />
              <span className="block text-red-500 text-sm">{ammountError}</span>
            </div>
          
       
                 <Button size="sm" onClick={handleWithdrawFund}>
                                Withdraw Now
                              </Button>

            </div>
        
        </div>



        {/* add or edit product form */}

        <div className="w-full " >
            <div className="w-full flex  items-start sm:items-center justify-between gap-6 mb-6 ">
                <h1 className=" text-xl sm:text-2xl  font-semibold text-gray-800 dark:text-white/90"
                    x-text="pageName">
                    Update Bank Details
                </h1>
                {/* <button className="flex items-center flex-nowrap gap text-primary text-base font-medium  ">
                    <FiEdit className=" mr-1.5" />
                    Edit
                </button> */}
            </div>
            <div className="w-full lg:w-1/2 bg-white border border-gray-100 px-6 py-8 rounded-xl shadow-md ">

                           <div className="w-full mb-8">
                                <label className={FORM_INPUT_LABEL}>
                                 Bank Account Number
                                </label>
                                <input
                                type="text"
                                name="bankAccountNumber"
                              
                                value={formData.bankAccountNumber}
                                onChange={handleInputChange}
                               
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}></span>
                           </div>
                            <div className="w-full">

                                 <label className={FORM_INPUT_LABEL}>
                                 Routing Number
                                </label>
                                <input
                                type="text"
                                name="routingNumber"
                                value={formData.routingNumber}
                                onChange={handleInputChange}
                            
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}></span>
                            </div>

                            <div className="flex items-center justify-end w-full gap-3 mt-8">
                              <Button size="sm" onClick={handleSubmitBankdDetails}>
                               Update
                              </Button>
                            </div>






            
            </div>

       

        </div>


    </div>
  );
}
