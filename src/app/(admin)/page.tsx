"use client"
import React, { useState, useRef, useEffect } from "react";
import CommonHeading from "@/components/common/CommonHeading";
import {  REQUIRED_ERROR } from "@/constant/constantClassName";
import Button from "@/components/ui/button/Button";


const FORM_INPUT_CLASS = "w-full h-10 text-base bg-white border-b border-gray-200 focus:border-gray-300  text-gray-600 outline-none   transition-all duration-500 " ;
const FORM_INPUT_LABEL = " block w-full  text-sm font-medium text-gray-600";
export default function Dashboard() {


  const [amount,setAmount] = useState<string>("");
  const [formData,setFormData]=useState({
    bankAccountNumber:"",
    routingNumber:"",
  }) 



  const handleSubmit = async ()=>{

  }
  return (

    <div className="w-full">



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
                  Available Fund
                </span>
                <span className="">
                  50000
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
              <span className="block text-red-500 text-sm">erorr</span>
            </div>
              <button className="w-40 px-4 py-2 rounded-lg bg-gray-200 font-medium">
                
                Withdraw Now
              </button>

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
                            
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}></span>
                            </div>

                            <div className="flex items-center justify-end w-full gap-3 mt-8">
                              <Button size="sm" onClick={handleSubmit}>
                               Update
                              </Button>
                            </div>






            
            </div>

       

        </div>


    </div>
  );
}
