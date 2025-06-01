"use client";
import React from "react";
import {EcommerceMetrics} from '../ecommerce/EcommerceMetrics'
import CommonHeading from "../common/CommonHeading";

export const AdminDashboard = () => {
    return (
        <div>
             <div className="w-full flex flex-col lg:flex-row items-start justify-start lg:justify-between  gap-6  mb-6">
                              <div className=" w-full lg:w-1/2 "  >
                                <CommonHeading
                                pageTitle="Dashboard"                   
                                />
                               </div>
                        </div>
            <EcommerceMetrics/>

        </div>
    );
};