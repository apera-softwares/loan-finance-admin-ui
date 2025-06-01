import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
// import Badge from "../ui/badge/Badge";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchUsers } from "@/lib/redux/slices/userManagementSlice";
import Spinner from "../common/Spinner";
import Pagination from "../tables/Pagination";
import UserAddEditModal from "./UserAddEditModal";
import { Toaster } from "react-hot-toast";

interface UserTableProps {
    searchText: string;
    from?: string;
}

const UserTable: React.FC<UserTableProps> = ({ searchText}) => {
    const ITEM_PER_PAGE = 5;
    const dispatch = useDispatch<AppDispatch>();
    const [usersData, setUsersData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { loading } = useSelector((state: RootState) => state.UserManagement);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editUserData, setEditUserData] = useState<any|null>(null);


    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, limit: ITEM_PER_PAGE,name:searchText})).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    setUsersData(res.payload.data || []);
                    const lastPage = res.payload.lastPage;
                    setTotalPages(lastPage);
                } else {
                    setUsersData([]);
                    setTotalPages(1);
                }
            } else {
                console.log("Failed to fetch users:", res.payload || "Unknown error");
                setUsersData([])
            }
        });
    }, [dispatch, currentPage, searchText,isModalOpen]);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    return (
        <div className="w-full overflow-hidden rounded-xl bg-white dark:bg-white/[0.03] shadow-md">
            <div className="w-full overflow-x-auto">
                <Toaster />

                <div className="w-full max-w-[900px] ">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">S.No</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Name</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Email</TableCell>
                                      <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Phone</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Available Credit</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Utilized Credit</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Interest Rate</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Assigned Sales Rep</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Status</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Action</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {usersData.length > 0 ? (
                                    usersData.map((user: any, index: number) => (
                                        <TableRow key={user?.id}>
                                            <TableCell className="px-5 py-4 text-start">
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {(currentPage - 1) * ITEM_PER_PAGE + index + 1}
                                                </span>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {`${user?.firstName||""} ${user?.lastName||""}`}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                               {`${user?.email||""}`}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                               {`${user?.phone||""}`}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {`${user?.UserDetails[0]?.availableCredit||"0"}`}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {`${user?.UserDetails?.[0]?.utilizedCredit||"0"}`}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {`${user?.UserDetails?.[0]?.interestRate||"0"}`}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {`${user?.UserDetails?.[0]?.assignedSalesRep||""}`}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {`${user?.UserDetails?.[0]?.status||""}`}
                                            </TableCell>
                                           
                                                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => {

                                                        if(user?.role==="ADMIN") return ;
                                                        setEditUserData(user)
                                                        setIsModalOpen(true)
                                                    }}>
                                                        <FiEdit className="h-5 w-5 " />Edit
                                                    </div>
                                                </TableCell>
                                        
                                        </TableRow>

                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell className="text-center py-6 text-gray-500">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
            <div className=" w-full flex justify-end px-4 py-6">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
            <UserAddEditModal isOpen={isModalOpen} closeModal={() => {
                setIsModalOpen(false)
            }} userData={editUserData}  type="update" />

        </div>
    );
};


export default UserTable