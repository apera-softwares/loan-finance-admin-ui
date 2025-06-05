"use client";
import React from "react";
import CommonHeading from "../common/CommonHeading";

const  SalesRepDashboard = () => {
    return (
        <div>
             <div className="w-full flex flex-col lg:flex-row items-start justify-start lg:justify-between  gap-6  mb-6">
                              <div className=" w-full lg:w-1/2 "  >
                                <CommonHeading
                                pageTitle="Sales Representative Dashboard"                   
                                />
                               </div>
                        </div>

        </div>
    );
};


export default SalesRepDashboard;