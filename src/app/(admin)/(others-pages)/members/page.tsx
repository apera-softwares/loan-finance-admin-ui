"use client";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import MembersTable from "@/components/members/MembersTable";


export default function Members() {

  const [SearchInput] = useState("");

  return (
    <div className="w-full ">
      <Toaster />
      <div className="w-full">
       <MembersTable searchText={SearchInput}/>
      </div>
    </div>
  );
}
