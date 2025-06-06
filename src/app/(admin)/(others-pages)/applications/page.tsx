"use client"
import React, { useState } from "react";
import UserAddEditModal from "@/components/user/UserAddEditModal";
import { Toaster } from "react-hot-toast";
import ReferralTable from "@/components/referral/ReferralTable";


export default function UserManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [SearchInput, setSearchInput] = useState("")

    return (
        <div className="w-full">
            <Toaster />
            <div className="w-full">
                <ReferralTable searchText={SearchInput} />
                <UserAddEditModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} type="add" />
            </div>
        </div>
    );
}

