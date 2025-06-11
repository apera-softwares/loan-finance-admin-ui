"use client";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import { useAppDispatch,useAppSelector } from "@/lib/redux/hooks";
import { fetchReferrals } from "@/lib/redux/slices/referralSlice";
import Spinner from "../common/Spinner";
import Pagination from "../tables/Pagination";
import { Toaster } from "react-hot-toast";
import ViewApplicationDetailsModal from "./ViewApplicationDetailsModal";
import UserAddEditModal from "../user/UserAddEditModal";
import { CreateUser } from "@/icons";
import { TABLE_CLASS,TABLE_ACTION_BUTTON_CLASS,TABLE_CELL_HEADER_CLASS, TABLE_CELL_REGULAR_CLASS, TABLE_HEADER_CLASS, TABLE_RAW_CLASS } from "@/constant/constantClassName";

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


interface ApplicationsTableProps {
    searchText: string;
}


const ApplicationsTable : React.FC<ApplicationsTableProps> = ({ searchText }) => {
    const ITEM_PER_PAGE = 5;
    const dispatch = useAppDispatch();
    const {referralList,loading} = useAppSelector((state)=>state.referral)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showApplicationDetailsModal,setShowApplicationDetailsModal] = useState<boolean>(false);
    const [ showUserAddModal,setShowUserAddModal ]=useState<boolean>(false);
    const [selectedApplication,setSelectedApplication] = useState<any>(null);
    

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
            console.log(error?.message || "Failed to fetch lead");
        }

   }

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    const handleCreateUser = (applicationData:any)=>{

        setSelectedApplication(applicationData);
        setShowUserAddModal(true);
    }

    const handleViewApplicationDetails = (applicationData:any)=>{

        setSelectedApplication(applicationData);
        setShowApplicationDetailsModal(true);
    }


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
                                            <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                                <div className="flex flex-col gap-2">
                                                                                                    <button className={`${TABLE_ACTION_BUTTON_CLASS}`} onClick={() => {
                                                      handleCreateUser(item);
                                                    }}>
                                                    <CreateUser/>
                                                    <span className=" text-xs  ">Create User</span> </button>

                                                    <button className={`text-center${TABLE_ACTION_BUTTON_CLASS} `}  
                                                     onClick={()=>{
                                                     handleViewApplicationDetails(item);
                                                     }}
                                                    >
                                                    View</button>
                                                </div>
                                             </TableCell>                                          
                                        
                                        </TableRow>

                                    ))
                                ) : (
                                    <TableRow className={`${TABLE_RAW_CLASS}`}>
                                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                            No applications found
                                        </TableCell>
                                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                          {``}
                                        </TableCell>
                                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                          {``}
                                        </TableCell>
                                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                          {``}
                                        </TableCell>
                                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                          {``}
                                        </TableCell>
                                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                          {``}
                                        </TableCell>
                                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                          {``}
                                        </TableCell>
                                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                                          {``}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
            </div>
            <div className=" w-full  md:px-3 py-5 ">
              {
                totalPages > 0 && (  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />)
              }
            </div>

            <ViewApplicationDetailsModal 
                isOpen={showApplicationDetailsModal} 
                closeModal={()=>{
                setShowApplicationDetailsModal(false);
                setSelectedApplication(null);
                }} 
                applicationData={selectedApplication}

             />

            <UserAddEditModal 
                isOpen={showUserAddModal} 
                closeModal={()=>{
                setShowUserAddModal(false);
                setSelectedApplication(null);
                }}
                userData={selectedApplication}
                type="add"  

                />
           

        </div>
    );
};


export default ApplicationsTable;