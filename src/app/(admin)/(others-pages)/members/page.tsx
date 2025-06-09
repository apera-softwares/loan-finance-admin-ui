"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import MembersTable from "@/components/members/MembersTable";
import { useAppSelector } from "@/lib/redux/hooks";

export default function Members() {

  const {searchText} = useAppSelector((state)=>state.app);

  return (
    <div className="w-full ">
      <Toaster />
      <div className="w-full">
       <MembersTable searchText={searchText}/>
      </div>
    </div>
  );
}
