import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Spinner from "../common/Spinner";
import Pagination from "../tables/Pagination";
import { BACKEND_API } from "@/api";
import axios from "axios";


interface MembersTableProps {
  searchText: string;
}

const MembersTable: React.FC<MembersTableProps> = ({
  searchText,
}) => {
  const ITEM_PER_PAGE = 5;
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state)=>state.user.user);
  const[loading,setLoading] = useState<boolean>(false);
  const[members,setMembers]= useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);  

   useEffect(() => {
    fetchMembers(1);
  }, []);

  useEffect(() => {
    fetchMembers(currentPage);
  }, [dispatch, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchMembers(1);
  }, [dispatch, searchText]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
 
  const fetchMembers = async (page:number) => {

  try {
    setLoading(true);
    const token = loggedInUser?.token;
    const response = await axios.get(
      `${BACKEND_API}sales-reps/getSalesRepMembers/${loggedInUser?.userId}?page=${page}&limit=5&name${searchText}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
   setMembers(response.data?.data || []);
   setTotalPages(response.data?.lastPage||0);
  } catch (error: any) {
    console.log("error while fetching sales reps", error);
  }
  finally{
    setLoading(false);
  }
};







  return (
    <div className="w-full overflow-hidden rounded-xl bg-white dark:bg-white/[0.03] shadow-md">
      <div className="w-full overflow-x-auto">
        <div className="w-full  ">
          {loading ? (
            <Spinner />
          ) : (
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-4 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                  >
                    S.No
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-4 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-4 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-4 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                  >
                    Phone
                  </TableCell>
      
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.length > 0 ? (
                  members.map((member: any, index: number) => (
                    <TableRow key={member?.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {(currentPage - 1) * ITEM_PER_PAGE + index + 1}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <span className="uppercase">
                          {`${member?.user?.firstName||""} ${member?.user?.lastName||""}`}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <span >
                          {`${member?.user?.email||""}`}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    
                          {`${member?.user?.phone||""}`}
                      
                      </TableCell>
             
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-center py-6 text-gray-500">
                      No members found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      <div className=" w-full flex justify-end px-4 py-6">
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
 
    </div>
  );
};

export default MembersTable;
