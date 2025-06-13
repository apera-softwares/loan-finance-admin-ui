"use client";
import React from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { AdminDashboard } from "@/components/dashbaord/AdminDashboard";
import SalesRepDashboard from "@/components/dashbaord/SalesRepDashboard";
import UserDashboard from "@/components/dashbaord/UserDashboard";
import { Roles } from "@/constant/roles";

export default function Dashboard() {
  
  const loggedInUser = useAppSelector((state) => state.user.user);

  return (
    <div className="w-full">
      {loggedInUser?.role === Roles.ADMIN ? (
        <AdminDashboard />
      ) : loggedInUser?.role === Roles.SALES_REP ? (
        <SalesRepDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
}
