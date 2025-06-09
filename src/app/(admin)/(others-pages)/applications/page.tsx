"use client"
import React, { useState } from "react";
import UserAddEditModal from "@/components/user/UserAddEditModal";
import { Toaster } from "react-hot-toast";
import ReferralTable from "@/components/referral/ReferralTable";
import { useAppSelector } from "@/lib/redux/hooks";

export default function Applications() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {searchText} = useAppSelector((state)=>state.app);

    return (
        <div className="w-full">
            <Toaster />
            <div className="w-full">
                <ReferralTable searchText={searchText} />
                <UserAddEditModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} type="add" />
            </div>
        </div>
    );
}

