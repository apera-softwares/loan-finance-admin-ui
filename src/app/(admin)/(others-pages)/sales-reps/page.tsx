"use client";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import SalesRepresentativeTable from "@/components/sales-representative/SalesRepresentativeTable";
import SalesRepresentativeAddEditModal from "@/components/sales-representative/SalesRepresentativeAddEditModal";
import { useAppSelector } from "@/lib/redux/hooks";

export default function SalesReps() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {searchText} = useAppSelector((state)=>state.app);

  return (
    <div className="w-full ">
      <Toaster />
      <div className="w-full">
        <SalesRepresentativeTable
          searchText={searchText}
          isCreateUserModalOpen={isModalOpen}
        />
        <div className="w-full flex items-center justify-end mt-8 md:mt-12 ">
           <button onClick={()=>setIsModalOpen(true)} className=" px-5 py-3 bg-primary text-white text-sm font-medium rounded-full ">
               Create New
            </button>
            </div>
        <SalesRepresentativeAddEditModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          type="add"
        />
      </div>
    </div>
  );
}
