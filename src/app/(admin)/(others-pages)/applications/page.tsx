"use client"
import React from "react";
import { Toaster } from "react-hot-toast";
import ApplicationsTable from "@/components/applications/ApplicationsTable";
import { useAppSelector } from "@/lib/redux/hooks";

export default function Applications() {

    const {searchText} = useAppSelector((state)=>state.app);

    return (
        <div className="w-full">
            <Toaster />
            <div className="w-full">
                <ApplicationsTable searchText={searchText} />
            </div>
        </div>
    );
}

