import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchUsers } from "@/lib/redux/slices/userManagementSlice";

interface Order {
    id: number;
    user: {
        image: string;
        name: string;
        role: string;
    };
    projectName: string;
    team: {
        images: string[];
    };
    status: string;
    budget: string;
}

// Define the table data using the interface
const tableData: Order[] = [
    {
        id: 1,
        user: {
            image: "/images/user/user-17.jpg",
            name: "Lindsey Curtis",
            role: "Web Designer",
        },
        projectName: "Agency Website",
        team: {
            images: [
                "/images/user/user-22.jpg",
                "/images/user/user-23.jpg",
                "/images/user/user-24.jpg",
            ],
        },
        budget: "3.9K",
        status: "Active",
    },
    
];

export const UserTable = () => {


    const dispatch = useDispatch<AppDispatch>();
    const [userData, setUserData] = useState<Order[]>([]);
    const { loading, error } = useSelector((state: RootState) => state.user);
  
    useEffect(() => {
      dispatch(fetchUsers()).then((res: any) => {
        if (res.payload) {
          setUserData(res.payload); // Ensure the API response matches `Order[]` shape
          console.log(res.payload ,"users list")
        }
      });
    }, [dispatch]);

    return (
        <div className="overflow-hidden rounded-xl bg-white  dark:bg-white/[0.03] shadow-md">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                                >
                                    S.No
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                                >
                                    Email
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                                >
                                    Role
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                                >
                                    Status
                                </TableCell>
                               
                            
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="">
                            {userData.map((user:any, index) => (
                                <TableRow key={user.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {index+1}
                                                </span>
                                                
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.firstName}{" "}{user.lastName}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {user.role}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color={
                                                user.verified
                                                    ? "success"
                                                    : !user.verified
                                                        ? "warning"
                                                        : "error"
                                            }
                                        >
                                            {user.verified ? "Verified" : "Not verified"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <FiEdit className="h-5 w-5 text-orange-300" />
                                    </TableCell>
                                   

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
