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
import { TABLE_CELL_HEADER_CLASS, TABLE_CELL_REGULAR_CLASS, TABLE_HEADER_CLASS, TABLE_RAW_CLASS } from "@/constant/constantClassName";


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
              <TableHeader className={`${TABLE_HEADER_CLASS}`}>
                <TableRow>
                  <TableCell
                    isHeader
                    className={`${TABLE_CELL_HEADER_CLASS}`}
                  >
                    S.No
                  </TableCell>
                  <TableCell
                    isHeader
                    className={`${TABLE_CELL_HEADER_CLASS}`}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className={`${TABLE_CELL_HEADER_CLASS}`}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className={`${TABLE_CELL_HEADER_CLASS}`}
                  >
                    Phone
                  </TableCell>
      
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.length > 0 ? (
                  members.map((member: any, index: number) => (
                    <TableRow key={member?.id} className={`${TABLE_RAW_CLASS}`}>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {(currentPage - 1) * ITEM_PER_PAGE + index + 1}
                        </span>
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        <span className="uppercase">
                          {`${member?.user?.firstName||""} ${member?.user?.lastName||""}`}
                        </span>
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        <span >
                          {`${member?.user?.email||""}`}
                        </span>
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                    
                          {`${member?.user?.phone||""}`}
                      
                      </TableCell>
             
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
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
