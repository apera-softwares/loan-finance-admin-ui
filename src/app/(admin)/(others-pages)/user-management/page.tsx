"use client"
import React, { useState } from "react";
import UserAddEditModal from "@/components/user/UserAddEditModal";
import UserTable from "@/components/user/UserTable";
import { Toaster } from "react-hot-toast";

export default function UserManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchInput,] = useState("")
    return (
        <div className="w-full ">
            <Toaster />
            <div className="w-full">
                <UserTable searchText={searchInput} isCreateUserModalOpen={isModalOpen}  />
                <div className="w-full flex items-center justify-end mt-8 md:mt-12 ">
                    <button onClick={()=>setIsModalOpen(true)} className=" px-5 py-3 bg-primary text-white text-sm font-medium rounded-full ">
                        Create User
                    </button>
                </div>
                <UserAddEditModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} type="add" />

            </div>
        </div>
    );
}
