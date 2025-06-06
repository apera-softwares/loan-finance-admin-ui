"use client";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import SalesRepresentativeTable from "@/components/sales-representative/SalesRepresentativeTable";
import SalesRepresentativeAddEditModal from "@/components/sales-representative/SalesRepresentativeAddEditModal";

export default function SalesReps() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [SearchInput] = useState("");

  return (
    <div className="w-full ">
      <Toaster />
      <div className="w-full">
        <SalesRepresentativeTable
          searchText={SearchInput}
          isCreateUserModalOpen={isModalOpen}
        />
        <SalesRepresentativeAddEditModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          type="add"
        />
      </div>
    </div>
  );
}
