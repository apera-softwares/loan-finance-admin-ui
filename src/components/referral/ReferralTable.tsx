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
        <div className="w-full overflow-hidden rounded-xl bg-white dark:bg-white/[0.03] shadow-md">
            <div className="w-full overflow-x-auto">
                <Toaster />

                <div className="w-full max-w-[900px]">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">S.No</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Name</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Email</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Phone Number</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Amount Required</TableCell>
                                     <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Business Revenue</TableCell>
                                     <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Business Tenure</TableCell>
                                     <TableCell isHeader className="px-5 py-3 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400">Credit Score</TableCell>
                                    
                        
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {referralList.length > 0 ? (
                                    referralList.map((item: any, index) => (
                                        <TableRow key={item?.id}>
                                            <TableCell className="px-5 py-4 text-start">
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                  {(currentPage - 1) * ITEM_PER_PAGE + index + 1}
                                                </span>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                             {
                                                `${item?.firstName||""} ${item?.lastName||""}`
                                             }
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {item?.email||""}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                  {
                                                `${item?.phone||""}`
                                             }
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                              {USDollar.format(`${item?.amountNeeded ||""}`)}
                                            </TableCell>
                                             <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">

                                                 {USDollar.format(`${item?.annualRevenue ||""}`)}
                                              
                                            </TableCell>
                                             <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">

                                                 {`${item?.timeInBusiness ||""}`}
                                              
                                            </TableCell>
                                             <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">

                                                 {`${item?.creditScore ||""}`}
                                              
                                            </TableCell>                                             
                                        
                                        </TableRow>

                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell className="text-center py-6 text-gray-500">
                                            No referrals found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
            <div className=" w-full flex justify-end px-4 py-6 ">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>

        </div>
    );
};


export default ReferralTable