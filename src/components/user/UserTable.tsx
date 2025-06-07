import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
// import Badge from "../ui/badge/Badge";
// import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchUsers } from "@/lib/redux/slices/userManagementSlice";
import Spinner from "../common/Spinner";
import Pagination from "../tables/Pagination";
import UserAddEditModal from "./UserAddEditModal";
import { Toaster } from "react-hot-toast";
import { TABLE_CLASS,TABLE_ACTION_BUTTON_CLASS,TABLE_CELL_HEADER_CLASS, TABLE_CELL_REGULAR_CLASS, TABLE_HEADER_CLASS, TABLE_RAW_CLASS } from "@/constant/constantClassName";

interface UserTableProps {
    searchText: string;
    isCreateUserModalOpen?:boolean;
    from?: string;
}

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const UserTable: React.FC<UserTableProps> = ({ searchText,isCreateUserModalOpen}) => {
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
    }, [dispatch, currentPage, searchText , isModalOpen,isCreateUserModalOpen ]);

   
    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    return (
        <div className="w-full">
            <div className="w-full overflow-hidden rounded-t-[14px]">
                <div className="w-full overflow-x-auto">
                <Toaster />
                <div className="w-full max-w-[920px]  ">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Table className={`${TABLE_CLASS}`}>
                            <TableHeader >
                                <TableRow className={`${TABLE_HEADER_CLASS}`}>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>S.No</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Name</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Email</TableCell>
                                      <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Phone</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Available Credit</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Utilized Credit</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Interest Rate</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Assigned Sales Rep</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Status</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Action</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {usersData.length > 0 ? (
                                    usersData.map((user: any, index: number) => (
                                        <TableRow key={user?.id} className={`${TABLE_RAW_CLASS}`}>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                <span className="font-medium text-[#2A2A2A]">
                                                    {(currentPage - 1) * ITEM_PER_PAGE + index + 1}
                                                </span>
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`} >
                                                <span style={{textTransform: 'capitalize'}}>{`${user?.firstName||""} ${user?.lastName||""}`}</span>
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                               {`${user?.email||""}`}
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                               {`${user?.phone||""}`}
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                {USDollar.format(`${user?.UserDetails[0]?.availableCredit||0}`)}
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                {USDollar.format(`${user?.UserDetails?.[0]?.utilizedCredit|| 0}`)}
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                {`${user?.UserDetails?.[0]?.interestRate||""}`} %
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                <span style={{textTransform: 'capitalize'}}>{`${user?.UserDetails?.[0]?.salesRep?.firstName||""} ${user?.UserDetails?.[0]?.salesRep?.lastName||""}`} </span>
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                {`${user?.UserDetails?.[0]?.status||""}`}
                                            </TableCell>
                                           
                                                <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                    <button className={`${TABLE_ACTION_BUTTON_CLASS}`} onClick={() => {

                                                        if(user?.role==="ADMIN") return ;
                                                        setEditUserData(user)
                                                        setIsModalOpen(true)
                                                    }}>
                                                        Edit
                                                    </button>
                                                </TableCell>
                                        
                                        </TableRow>

                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
            </div>
            <div className=" w-full md:px-3 py-5">
                {
                   totalPages > 0 && (  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />)
                }
              
            </div>
            <UserAddEditModal isOpen={isModalOpen} closeModal={() => {
                setIsModalOpen(false)
                setEditUserData(null);
            }} userData={editUserData}  type="update" />

        </div>
    );
};


export default UserTable