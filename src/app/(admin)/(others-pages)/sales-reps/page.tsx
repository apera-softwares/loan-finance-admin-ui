"use client";
import React, { useState } from "react";
import CommonHeading from "@/components/common/CommonHeading";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePlus } from "react-icons/hi";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "@/lib/redux/hooks";
import SalesRepresentativeTable from "@/components/sales-representative/SalesRepresentativeTable";
import SalesRepresentativeAddEditModal from "@/components/sales-representative/SalesRepresentativeAddEditModal";

export default function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [SearchInput, setSearchInput] = useState("");
  // const [order, setOrder] = useState("");
  const loggedInUser = useAppSelector((state)=>state.user.user);
  console.log("loggedUser", loggedInUser);

  return (
    <div className="w-full ">
      <Toaster />
      {/* Top Bar: Left (Heading), Right (Search + Actions) */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-between  gap-6 mb-8 ">
        {/* Left: Heading */}
        <div className="w-full lg:w-1/2 ">
          <CommonHeading
            pageTitle="Sales Representatives"
            description="Manage Sales Representatives"
          />
        </div>

        {/* Right: Actions */}
        <div className="w-full lg:w-1/2 flex flex-wrap justify-start lg:justify-end items-center gap-3">
          {/* Search Input */}
          <div className="relative h-11">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <CiSearch className="text-lg " />
            </span>
            <input
              type="text"
              placeholder="Search by name"
              name="SearchInput"
              value={SearchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 h-11 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-400 transition-all duration-300 "
            />
          </div>
          {/* Create Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="border border-[#151D48] w-32 h-11 text-[#151D48] rounded-md text-sm justify-center text-center outline-none flex items-center gap-1"
          >
            <HiOutlinePlus />
            Create New
          </button>
        </div>
      </div>

      {/* Table */}
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
