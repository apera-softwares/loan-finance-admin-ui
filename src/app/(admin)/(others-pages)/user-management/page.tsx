"use client"
import React from "react";
import CommonHeading from "@/components/common/CommonHeading";
import { UserTable } from "@/components/user/UserTable";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePlus } from "react-icons/hi";

export default function UserManagement() {



    return (
        <div className="">
            {/* Top Bar: Left (Heading), Right (Search + Actions) */}
            <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center gap-4">
                {/* Left: Heading */}
                <div className=" w-auto">
                    <CommonHeading
                        pageTitle="User Management"
                        description="Manage all users across Bee-Team, A-Team, Managers, and Admins."
                    />
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap justify-start lg:justify-end items-center gap-3 w-1/2">
                    {/* Search Input */}
                    <div className="relative h-11">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <CiSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by name, product, date"
                            className="pl-10 h-11 pr-4 py-2 border border-gray-300 rounded-md focus:outline-[#FFA819]"
                        />
                    </div>
                    {/* Create User Button */}

                    <button className="border border-[#151D48] w-32 h-11 text-[#151D48] rounded-md text-sm justify-center text-center outline-none flex items-center gap-1">
                        <HiOutlinePlus />
                        Create User
                    </button>

                    {/* Filter Dropdown */}
                    <select className="border border-[#151D48] w-32 h-11 text-[#151D48] rounded-md text-sm justify-center text-center outline-none">
                        <option value="">Filter By Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="team-a">Team A</option>
                        <option value="team-b">Team B</option>
                    </select>



                    {/* Upload Button */}
                    <div className="w-32 h-11 relative rounded-md">
                        <div className="w-32 h-11 left-0 top-0 absolute bg-amber-500 rounded-md" />
                        <div className="left-[36px] top-[14.43px] absolute justify-start text-white text-sm font-medium font-['Montserrat']">CSV/PDF</div>
                    </div>

                </div>
            </div>

            {/* Table */}
            <div className="mt-6">
                <UserTable />
            </div>
        </div>
    );
}
