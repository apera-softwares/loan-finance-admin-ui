"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import BankTransactionsTable from "@/components/bank/BankTransactionsTable";


export default function BankTransactions() {

  return (
    <div className="w-full ">
      <Toaster />
      <div className="w-full">
        <BankTransactionsTable/>
      </div>
    </div>
  );
}
