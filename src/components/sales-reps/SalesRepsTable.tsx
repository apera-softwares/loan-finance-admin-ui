import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Spinner from "../common/Spinner";
import Pagination from "../tables/Pagination";
import { Toaster } from "react-hot-toast";
import { fetchSalesReps } from "@/lib/redux/slices/salesRepSlice";
import SalesRepsAddEditModal from "./SalesRepAddEditModal";

interface SalesRepsTableProps {
    searchText: string;
    isCreateUserModalOpen?:boolean;
    from?: string;
}

const SaeslRepsTable: React.FC<SalesRepsTableProps> = ({ searchText,isCreateUserModalOpen}) => {
    const ITEM_PER_PAGE = 5;
    const dispatch = useDispatch<AppDispatch>();
    const [usersData, setUsersData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { loading } = useSelector((state: RootState) => state.UserManagement);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editUserData, setEditUserData] = useState<any|null>(null);


    useEffect(() => {
        dispatch(fetchSalesReps({ page: currentPage, limit: ITEM_PER_PAGE,name:searchText})).then((res: any) => {
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
    }, [dispatch, currentPage, searchText , isModalOpen,isCreateUserModalOpen ]);

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
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Commission</TableCell>                                     
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
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                                <span style={{textTransform: 'capitalize'}}>{`${user?.name||""}`}</span>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                               {`${user?.commission||""}`} %
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
            {<SalesRepsAddEditModal isOpen={isModalOpen} closeModal={() => {
                setIsModalOpen(false)
            }} userData={editUserData}  type="update" />}

        </div>
    );
};


export default SaeslRepsTable