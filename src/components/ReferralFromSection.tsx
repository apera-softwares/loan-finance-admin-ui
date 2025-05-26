"use client";
import React,{useState,useEffect} from "react";
import Button from "./ui/button/Button";
import Checkbox from "./form/input/Checkbox";
import { FORM_INPUT_CLASS, REQUIRED_ERROR } from "@/constant/constantClassName";

interface FormDataState {
  firstName:string;
  lastName:string;
  phoneNumber:string;
  email: string;
  address: string ;
  postalCode: string;
  MemberFirstName:string;
  MemberLastName :string;
  notes:string;
  preferredSalesPersonId: string;
  status:string;
  productId:string ;
  teamMemberId:string;
  cityId ?:string;
  stateId? :string;
}
const ReferralFromSection = () => {

  const [formData,setFormData] = useState<FormDataState>({
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  address: "",
  postalCode: "",
  MemberFirstName: "",
  MemberLastName: "",
  notes: "",
  preferredSalesPersonId: "",
  status: "",
  productId: "",
  teamMemberId: "",
  cityId:"",
  stateId:"",
})


const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>{

  const {name,value} = e.target;

  setFormData((prev:FormDataState)=>({...prev,[name]:value}));


}
  
  return (
    <div className="w-full max-w-[1500px] bg-white p-8 rounded-xl mb-14 md:mb-20">

      <div className="w-full ">
        <div className="w-full space-y-10 lg:space-y-14 mb-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 ">
            <div className="w-full">
              <input
                type="text"
                placeholder="First name"
                name="firstName"
                className={`${FORM_INPUT_CLASS}`}
                value={formData.firstName}
                onChange={handleChange}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Last name"
                name="lastName"
                className={`${FORM_INPUT_CLASS}`}
                value={formData.lastName}
                onChange={handleChange}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Phone number"
                name="phoneNumber"
                className={`${FORM_INPUT_CLASS}`}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 ">
            <div className="w-full">
              <input
                type="text"
                placeholder="Email"
                name="email"
                className={`${FORM_INPUT_CLASS}`}
                value={formData.email}
                onChange={handleChange}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Address"
                name="address"
                className={`${FORM_INPUT_CLASS}`}
                value={formData.address}
                onChange={handleChange}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="City or state"
                className={`${FORM_INPUT_CLASS}`}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 ">
           
            <div className="w-full">
              <input
                type="text"
                placeholder="Postal code"
                name="postalCode"
                className={`${FORM_INPUT_CLASS}`}
                value={formData.postalCode}
                onChange={handleChange}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder={`Member's first and last name`}
                className={`${FORM_INPUT_CLASS}`}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Product Referring and preferred salesperson"
                className={`${FORM_INPUT_CLASS}`}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
          </div>
          

          <div className="w-full grid grid-cols-1 ">
            <div className="w-full">
              <textarea
               name="notes"
                placeholder="Additional pb-4 border-b  Info and Notes (LEAD GEN GUIDELINE ANSWERS, ETC)"
                className={`h-24 md:h-32 ${FORM_INPUT_CLASS}`}
                value={formData.notes}
                onChange={handleChange}
              />
              <span className="text-sm text-red-500"></span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8 md:mb-12 ">
          <div className=" w-full  md:w-3/5 flex items-start gap-3 text-sm font-medium  ">
      
             <Checkbox checked={true} onChange={()=>{}} />
            Customer Consents to receive SMS Notifications, Alerts & Occasional
            Marketing Communication from the company. Message frequency varies.
            Message & data rates may apply. You can reply STOP to unsubscribe at
            any time.
          </div>
    
           <Button size="md" variant="primary" >
            Send Referral
          </Button>
          
        </div>

      </div>
    </div>
  );
};

export default ReferralFromSection;
