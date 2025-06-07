"use client";
import React from "react";
import DashboardApplicationsStats from "./DashboardApplicationsStats";
import StatisticsChart from "./StatisticsChart";

export const AdminDashboard = () => {
    return (
        <div className="w-full">
            <div className="w-full mb-8 lg:mb-9">
                <DashboardApplicationsStats/>
            </div>
            <div className="w-full">
                <StatisticsChart/>
                
            </div>

        </div>
    );
};