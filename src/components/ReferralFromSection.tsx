import { FORM_INPUT_CLASS, REQUIRED_ERROR } from "@/constant/constantClassName";
import React from "react";
import { TbArrowNarrowRight } from "react-icons/tb";

const ReferralFromSection = () => {
  return (
    <div className="w-full max-w-[1500px] bg-white p-8 rounded-xl mb-14 md:mb-20">

      <div className="w-full ">
        <div className="w-full space-y-10 lg:space-y-14 mb-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 ">
            <div className="w-full">
              <input
                type="text"
                placeholder="First name"
                className={`${FORM_INPUT_CLASS}`}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Last name"
                className={`${FORM_INPUT_CLASS}`}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Phone number"
                className={`${FORM_INPUT_CLASS}`}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 ">
            <div className="w-full">
              <input
                type="text"
                placeholder="Email"
                className={`${FORM_INPUT_CLASS}`}
              />
              <span className={`${REQUIRED_ERROR}`}></span>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Address"
                className={`${FORM_INPUT_CLASS}`}
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
                className={`${FORM_INPUT_CLASS}`}
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
                placeholder="Additional pb-4 border-b  Info and Notes (LEAD GEN GUIDELINE ANSWERS, ETC)"
                className={`h-24 md:h-32 ${FORM_INPUT_CLASS}`}
              />
              <span className="text-sm text-red-500"></span>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between mb-8 md:mb-12 ">
          <p className=" text-sm font-medium w-[60%]">
            <input
              type="checkbox"
              name=""
              id=""
              className="mr-2 w-4 h-4 bg-orange-500 translate-y-[2px]  "
            />
            Customer Consents to receive SMS Notifications, Alerts & Occasional
            Marketing Communication from the company. Message frequency varies.
            Message & data rates may apply. You can reply STOP to unsubscribe at
            any time.
          </p>
          <button className="p-2 px-8 bg-orange-400 text-white rounded-md">Send Referral</button>
        </div>

      </div>
    </div>
  );
};

export default ReferralFromSection;
