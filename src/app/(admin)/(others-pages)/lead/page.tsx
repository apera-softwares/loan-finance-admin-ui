"use client"
import React, { useState } from "react";
import CommonHeading from "@/components/common/CommonHeading";
import { CiSearch } from "react-icons/ci";
import UserAddEditModal from "@/components/user/UserAddEditModal";
// import UserTable from "@/components/user/UserTable";
import { Toaster } from "react-hot-toast";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES } from "@/data/services";
import ReferralTable from "@/components/referral/ReferralTable";
import LeadCard from "@/components/LeadCard";
import Button from "@/components/ui/button/Button";

export default function UserManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [SearchInput, setSearchInput] = useState("")

    return (
        <div className="w-full">
            <Toaster />
            {/* Top Bar: Left (Heading), Right (Search + Actions) */}
            <div className="w-full flex flex-col lg:flex-row items-start justify-between  gap-6  mb-8 ">
                {/* Left: Heading */}
                <div className="w-full lg:w-1/2 ">
                    <CommonHeading
                        pageTitle="Lead"
                    // description="Manage all users across Bee-Team, A-Team, Managers, and Admins."
                    />
                </div>

                {/* Right: Actions */}
                <div className=" w-full lg:w-1/2 flex flex-wrap justify-start lg:justify-end items-center gap-3   ">
                    {/* Search Input */}
                    <div className="relative h-11">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <CiSearch className="text-lg" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by name"
                            name="SearchInput"
                            value={SearchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="pl-10 h-11 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-400 transition-all duration-300"
                        />
                    </div>
                    {/* Create User Button */}

                    {/* <button
                        onClick={() => setIsModalOpen(true)}
                        className="border border-[#151D48] w-32 h-11 text-[#151D48] rounded-md text-sm justify-center text-center outline-none flex items-center gap-1">
                        <HiOutlinePlus />
                        Create User
                    </button> */}

                    {/* Filter Dropdown */}
                    {/* <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="border border-[#151D48] w-32 h-11 text-[#151D48] rounded-md text-sm justify-center text-center outline-none">
                        <option value="">Filter By Role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="A_TEAM">Team A</option>
                        <option value="B_TEAM">Team B</option>
                    </select> */}

                    {/* Filter By Asc Des */}
                    {/* <select
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        className="border border-[#151D48] w-32 h-11 text-[#151D48] rounded-md text-sm justify-center text-center outline-none">
                        <option value="">Short By</option>
                        <option value="asc">asc to des</option>
                        <option value="desc">des to asc</option>
                    </select> */}

                    {/* <Button variant="primary" onClick={()=>{}}>
                    Filter by referral source
                    </Button> */}

                </div>
            </div>
            {/* <div className="w-full  grid grid-cols-1  lg:grid-cols-4 justify-center gap-6 mb-6 ">
                <LeadCard
                    title="New Referrals"
                    value="30"
                    point="5+ Increased form last month"
                    active={true}
                />
                <LeadCard
                    title="Leads Pitched"
                    value="24"
                    point="5+ Increased form last month"
                    active={false}
                />
                <LeadCard
                    title="Leads Sold"
                    value="12"
                    point="10+ Increased form last month"
                    active={false}

                />
                <LeadCard
                    title="Total Earned (Team)"
                    value="$2,400"
                    point="15+ Increased form last month"
                    active={false}

                />
            </div> */}
            {/* Table */}
            <div className="w-full">
                {/* <UserTable searchText={SearchInput} role="A_TEAM" order="" from="team-a" /> */}
                <ReferralTable searchText={SearchInput} />

                         {/* <div className=" overflow-x-auto  no-scrollbar my-6 ">
                          <div className=" max-w-[900px] flex space-x-5 ">
                {SERVICES && SERVICES?.length > 0 ? (
                    SERVICES?.map((serviceItems: any) => (
                        <ServiceCard
                            key={serviceItems?.id}
                            title={serviceItems?.title}
                            points={serviceItems?.servicesPoints}
                            images={serviceItems?.images}
                        />
                    ))
                ) : (
                    <div></div>
                )}
            </div>
            </div> */}
                <UserAddEditModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} type="add" />
            </div>
        </div>
    );
}

