"use client"
import React, { useState,  useEffect } from "react";
import {  REQUIRED_ERROR } from "@/constant/constantClassName";
import Button from "@/components/ui/button/Button";
import { BACKEND_API } from "@/api";
import axios from "axios";
import { useAppDispatch,useAppSelector } from "@/lib/redux/hooks";
import { getUserProfile } from "@/lib/redux/slices/loginPersonProfile";
import { FiEdit } from "react-icons/fi";

import toast,{ Toaster } from "react-hot-toast";
import { AdminDashboard } from "@/components/dashbaord/AdminDashboard";
import SalesRepDashboard from "@/components/dashbaord/SalesResDashboard";
import { Roles } from "@/constant/roles";


const FORM_INPUT_CLASS = "w-full h-10 text-base bg-white border-b border-gray-200 focus:border-gray-300  text-gray-600 outline-none   transition-all duration-500 " ;
const FORM_INPUT_LABEL = " block w-full  text-sm font-medium text-gray-600";

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function Dashboard() {

  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state)=>state.user.user);
  const loggedInUserProfile = useAppSelector((state)=>state.userProfile.userProfile);
  const [amount,setAmount] = useState<string>("");
  const [ammountError,setAmountError] = useState("");
  const [formData,setFormData]=useState({
    bankAccountNumber:loggedInUserProfile?.UserDetails?.[0]?.bankAccountNumber||"",
    routingNumber:loggedInUserProfile?.UserDetails?.[0]?.routingNumber||"",
  }) 
  const[isEditMode,setIsEditMode] = useState<boolean>(false);


  useEffect(()=>{

    setFormData({
    bankAccountNumber:loggedInUserProfile?.UserDetails?.[0]?.bankAccountNumber||"",
    routingNumber:loggedInUserProfile?.UserDetails?.[0]?.routingNumber||"",
  });

  },[isEditMode])


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmitBankdDetails = async ()=> {
  try {
   

  const id =loggedInUser?.userId;
   const payload = {id:id,
    email:loggedInUserProfile?.email,
    ...formData};
   const token = loggedInUser?.token;
   //console.log("payload for bank details update",payload);
  
   
    const response = await axios.put(
      `${BACKEND_API}admin/user/${id}`,
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
    dispatch(getUserProfile());
    toast.success("Update bank details successfully");
    setIsEditMode(false);
  } catch (error) {
    console.log("error while update bank details",error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(error.response.data.message||"Failed to update bank details" )
      } else {
         toast.error("Failed to update bank details");
      }
    } else {
      toast.error("Failed to update bank details");
    }
    setIsEditMode(false);
    setFormData({
    bankAccountNumber:loggedInUserProfile?.UserDetails?.[0]?.bankAccountNumber||"",
    routingNumber:loggedInUserProfile?.UserDetails?.[0]?.routingNumber||"",
  })
  
  }
};

const handleWithdrawFund = async ()=> {
  try {

   if(!validateAmount()) return ;
   const token = loggedInUser?.token;
   const payload = {
    amount:parseFloat(amount)||0
   };

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

const handleToggleEdit = ()=>{
  setIsEditMode(!isEditMode);
}



//console.log("loggedinuser dashboard page",loggedInUser);
console.log("loggedINuserprofile dashboardpage",loggedInUserProfile);
//console.log("form data admin page",formData);


  return (

    <div className="w-full">
      <Toaster/>
      {
         loggedInUser?.role === Roles.ADMIN ? (<div className="w-full">              
            <AdminDashboard/>
          </div>): loggedInUser?.role === Roles.SALES_REP ? (<div className="w-full"><SalesRepDashboard/></div>):(    <div className="w-full">
              {/* Top Bar: Left (Heading), Right (Search + Actions) */}
            <div className="w-full  mb-20 "> 
            {/* <div className="w-full flex flex-col lg:flex-row items-start justify-start lg:justify-between  gap-6  mb-6">
                  <div className=" w-full lg:w-1/2 "  >
                    <CommonHeading
                    pageTitle=""
                   
                      />
                   </div>

            </div> */}

             <div className="w-full flex gap-8 ">
                  <div className="max-w-xl p-6 bg-white rounded-xl border border-gray-200 shadow-lg shrink-0 ">
              <div className="w-full grid grid-cols-2  gap-x-10  gap-y-8 ">

                <div className="w-full  flex flex-col ">
                 <h5 className="text-base font-bold">Available Credit</h5>
                 <span className="text-base font-semibold text-gray-600 ">  {
                    USDollar.format(`${loggedInUserProfile?.UserDetails?.[0]?.availableCredit||"0"}`)
                  }
                  </span>
                </div>
                <div className="w-full  flex flex-col ">
                 <h5 className="text-base font-bold">Utilized Credit</h5>
                 <span className="text-base font-semibold text-gray-600 ">  {
                    USDollar.format(`${loggedInUserProfile?.UserDetails?.[0]?.utilizedCredit|| 0}`)
                  }
                  </span>
                </div>
                <div className="w-full  flex flex-col ">
                 <h5 className="text-base font-bold">Interest Rate</h5>
                 <span className="text-base font-semibold text-gray-600 "> 
                   {loggedInUserProfile?.UserDetails?.[0]?.interestRate != null
                  ? `${loggedInUserProfile.UserDetails[0].interestRate}%`
                  : "N/A"}
                  </span>
                </div>
                <div className="w-full  flex flex-col">
                 <h5 className="text-base font-bold">Assigned Sales Representive</h5>

                 <span className="text-base font-semibold text-gray-600 " style={{textTransform: 'capitalize'}}>  {
                    `${loggedInUserProfile?.UserDetails?.[0]?.assignedSalesRep||"NA"}`
                  }
                  </span>
                </div>
        
              </div>

                   </div>
                 <div className="max-w-sm p-6 bg-white rounded-xl border border-gray-200 shadow-lg shrink-0 ">

            <div className="w-full mb-6">
              <label className="block w-full text-base font-bold mb-1">
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
        
            </div>



        {/* add or edit product form */}

           <div className="w-full  max-w-xl" >
            <div className="w-full flex  items-start sm:items-center justify-between gap-6 mb-6 ">
                <h1 className=" text-xl sm:text-2xl  font-semibold text-gray-800 dark:text-white/90"
                    x-text="pageName">
                    Update Bank Details
                </h1>
                <button onClick={handleToggleEdit} className="flex items-center flex-nowrap gap text-gray-800 text-base font-medium  ">
                    <FiEdit className=" mr-1.5  " />
                    Edit
                </button>
            </div>
            <div className="w-full  bg-white border border-gray-200 px-6 py-8 rounded-xl shadow-md ">

                           <div className="w-full mb-8">
                                <label className={FORM_INPUT_LABEL}>
                                 Bank Account Number
                                </label>
                                <input
                                type="text"
                                name="bankAccountNumber"
                                readOnly={!isEditMode}
                                placeholder={loggedInUserProfile?.UserDetails?.[0]?.bankAccountNumber||""}
                              
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
                                placeholder={loggedInUserProfile?.UserDetails?.[0]?.routingNumber||""}
                                readOnly={!isEditMode}
                                value={formData.routingNumber}
                                onChange={handleInputChange}
                            
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}></span>
                            </div>


                       

                            <div className="flex items-center justify-end w-full gap-3 mt-8">
                                      {
                              isEditMode && (      <Button size="sm" onClick={handleSubmitBankdDetails}>
                               Update
                              </Button>)
                            }
                            </div>

            
            </div>

       

           </div>
          </div>) 
      }



    </div>
  );
}
