"use client";
import React, { useState } from "react";
import CommonHeading from "@/components/common/CommonHeading";
import { CiSearch } from "react-icons/ci";
import { Toaster } from "react-hot-toast";
export default function UserManagement() {

  const [SearchInput, setSearchInput] = useState("");

  return (
    <div className="w-full ">
      <Toaster />
      {/* Top Bar: Left (Heading), Right (Search + Actions) */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-between  gap-6 mb-8 ">
        {/* Left: Heading */}
        <div className="w-full lg:w-1/2 ">
          <CommonHeading
            pageTitle="withdrawal request"
            description="Manage withdrawal request"
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
        
        </div>
      </div>

      {/* Table */}
      <div className="w-full">
   
      </div>
    </div>
  );
}
