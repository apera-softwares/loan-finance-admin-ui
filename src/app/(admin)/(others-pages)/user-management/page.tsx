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
                <UserAddEditModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} type="add" />

            </div>
        </div>
    );
}
