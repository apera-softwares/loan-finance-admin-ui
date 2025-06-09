"use client"
import React, { useState } from "react";
import UserAddEditModal from "@/components/user/UserAddEditModal";
import UserTable from "@/components/user/UserTable";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "@/lib/redux/hooks";

export default function UserManagement() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {searchText} = useAppSelector((state)=>state.app);
    
    return (
        <div className="w-full ">
            <Toaster />
            <div className="w-full">
                <UserTable searchText={searchText} isCreateUserModalOpen={isModalOpen}  />
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
