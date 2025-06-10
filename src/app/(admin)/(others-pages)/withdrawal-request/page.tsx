"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import WithdrawalRequestsTable from "@/components/withdrawal/WithdrawalRequestsTable";
import { useAppSelector } from "@/lib/redux/hooks";

export default function WithdrawalRequest() {

  const {searchText} = useAppSelector((state)=>state.app);

  return (
    <div className="w-full ">
      <Toaster />
      <div className="w-full">
        <WithdrawalRequestsTable
          searchText={searchText}
        />
      </div>
    </div>
  );
}
