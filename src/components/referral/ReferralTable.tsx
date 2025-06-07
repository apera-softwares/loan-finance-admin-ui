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
import { useAppDispatch,useAppSelector } from "@/lib/redux/hooks";
import { fetchReferrals } from "@/lib/redux/slices/referralSlice";
import Spinner from "../common/Spinner";
import Pagination from "../tables/Pagination";
import { Toaster } from "react-hot-toast";
import { FiUser } from "react-icons/fi";
import UserAddEditModal from "../user/UserAddEditModal";
import { TABLE_CLASS,TABLE_ACTION_BUTTON_CLASS,TABLE_CELL_HEADER_CLASS, TABLE_CELL_REGULAR_CLASS, TABLE_HEADER_CLASS, TABLE_RAW_CLASS } from "@/constant/constantClassName";

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


interface ReferralTableProps {
    searchText: string;
}
// type BadgeColor =
//   | "primary"
//   | "success"
//   | "error"
//   | "warning"
//   | "info"
//   | "light"
//   | "dark";

const ReferralTable: React.FC<ReferralTableProps> = ({ searchText }) => {
    const ITEM_PER_PAGE = 5;
    const dispatch = useAppDispatch();
    const {referralList,loading} = useAppSelector((state)=>state.referral)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const [editUserData, setEditUserData] = useState<any|null>(null);
    

    useEffect(()=>{
       getReferrals(currentPage);
    },[dispatch,currentPage])
    
      useEffect(()=>{
       setCurrentPage(1);
       getReferrals(1);
    },[dispatch,searchText])

   const getReferrals = async(page:number)=>{
       try {
            const params={
                page:page,
                limit:ITEM_PER_PAGE,
                searchQuery:searchText
            }
            const res = await dispatch(fetchReferrals(params)).unwrap();
            setTotalPages(res?.lastPage);

        } catch (error: any) {
            console.log(error?.message || "Failed to fetch products");
        }

   }

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    // const getBadgeColor = (status: string):BadgeColor => {
    //     switch (status.toLowerCase()) {
    //         case 'pitched':
    //             return 'primary';
    //         case 'pending':
    //             return 'info';
    //         case 'sold':
    //             return 'light';
    //         case 'payout':
    //             return 'success';
    //         default:
    //             return 'light'; 
    //     }
    // };

    return (
        <div className="w-full">
            <div className="w-full overflow-hidden rounded-t-[14px]">
                   <div className="w-full overflow-x-auto">
                <Toaster />

                <div className="w-full max-w-[900px]">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Table className={`${TABLE_CLASS}`}>
                            <TableHeader >
                                <TableRow className={`${TABLE_HEADER_CLASS}`}>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>S.No</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Name</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Email</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Phone Number</TableCell>
                                    <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Amount Required</TableCell>
                                     <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Business Revenue</TableCell>
                                     <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Business Tenure</TableCell>
                                     <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Credit Score</TableCell>
                                     
                                     <TableCell isHeader className={`${TABLE_CELL_HEADER_CLASS}`}>Action</TableCell>
                        
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {referralList.length > 0 ? (
                                    referralList.map((item: any, index) => (
                                        <TableRow key={item?.id} className={`${TABLE_RAW_CLASS}`}>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                  {(currentPage - 1) * ITEM_PER_PAGE + index + 1}
                                                </span>
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                <span style={{textTransform: 'capitalize'}}>
                                             {
                                                `${item?.firstName||""} ${item?.lastName||""}`
                                             }</span>
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                {item?.email||""}
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                  {
                                                `${item?.phone||""}`
                                             }
                                            </TableCell>
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                              {USDollar.format(`${item?.amountNeeded ||""}`)}
                                            </TableCell>
                                             <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>

                                                 {USDollar.format(`${item?.annualRevenue ||""}`)}
                                              
                                            </TableCell>
                                             <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>

                                                 {`${item?.timeInBusiness ||""}`}
                                              
                                            </TableCell>
                                             <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>

                                                 {`${item?.creditScore ||""}`}
                                              
                                            </TableCell>   
                                            <TableCell>
                                                <button className={`${TABLE_ACTION_BUTTON_CLASS}`} onClick={() => {
                                                    setEditUserData(item);
                                                    setIsModalOpen(true);
                                                    }}>
                                                    <FiUser className="h-5 w-5 " /><span className="text-xs font-normal">Create User</span> </button>
                                             </TableCell>                                          
                                        
                                        </TableRow>

                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell className={`${TABLE_ACTION_BUTTON_CLASS}`}>
                                            No referrals found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
            </div>
            <div className=" w-full  px-3 py-5 ">
              {
                totalPages > 0 && (  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />)
              }
            </div>
           { isModalOpen && <UserAddEditModal isOpen={isModalOpen} closeModal={() => {
                setIsModalOpen(false)
            }} userData={editUserData}  type="add" /> }

        </div>
    );
};


export default ReferralTable