import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchWithdrawals,updateWithdrawal } from "@/lib/redux/slices/withdrawalSlice";
import Spinner from "../common/Spinner";
import Pagination from "../tables/Pagination";
import toast, { Toaster } from "react-hot-toast";
import {
  TABLE_CLASS,
  TABLE_CELL_HEADER_CLASS,
  TABLE_CELL_REGULAR_CLASS,
  TABLE_HEADER_CLASS,
  TABLE_RAW_CLASS,
} from "@/constant/constantClassName";
import { Roles } from "@/constant/roles";
import Badge from "../ui/badge/Badge";
import { FaAngleDown } from "react-icons/fa6";

interface WithdrawalRequestsTableProps {
  searchText: string;
  from?: string;
}

const statusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Funded", value: "FUNDED" },
  { label: "Declined", value: "DECLINED" },
  { label: "Canceled", value: "CANCELED" },
];

const WithdrawalRequestsTable: React.FC<WithdrawalRequestsTableProps> = ({
  searchText
}) => {
  const ITEM_PER_PAGE = 5;
  const dispatch = useAppDispatch();
  const { loading, withdrawals } = useAppSelector((state) => state.withdrawal);
  const loggedInUser = useAppSelector((state) => state.user.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
    const [updatingWithdrawalReqId, setUpdatingWithdrawalReqId] = useState<string | null>(
    null
  );
  const [statusUpdateLoading, setStatusUpdateLoading] =
    useState<boolean>(false);

  useEffect(() => {
    getWithdrawalRequests(currentPage);
  }, [dispatch, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    getWithdrawalRequests(1);
  }, [dispatch, searchText]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const getWithdrawalRequests = async (page: number) => {
    try {
      const params = {
        page: page,
        limit: ITEM_PER_PAGE,
        name: searchText,
      };
      const res = await dispatch(fetchWithdrawals(params)).unwrap();
      setTotalPages(res?.lastPage || 0);
    } catch (error: any) {
      setTotalPages(0);
      setCurrentPage(1);
      console.log(error?.message || "Failed to fetch withdrawals");
    }
  };

    const handleUpdateWithdrawalReqStatus = async (item: any, status: string) => {

    setUpdatingWithdrawalReqId(item?.id);
    setStatusUpdateLoading(true);
    try {
      
      const payload = {
        id:item?.id,
        status: status,
      };
  
      await dispatch(updateWithdrawal(payload)).unwrap();
      toast.success("Update  status successfully");
      getWithdrawalRequests(currentPage);
    } catch (error: any) {
      console.log("Error while update withdraw req status:", error);
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Failed to update status";

      toast.error(errorMessage);
    } finally {
      setUpdatingWithdrawalReqId(null);
      setStatusUpdateLoading(false);
    }
  };

  function mapStatusToVariant(
    status: string
  ): "primary" | "success" | "error" | "warning" | "info" {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "warning";
      case "APPROVED":
        return "primary";
      case "FUNDED":
        return "success";
      case "CANCELED":
        return "error";
      case "DECLINED":
        return "error";
      default:
        return "info";
    }
  }

  return (
    <div className="w-full ">
      <div className="w-full overflow-hidden  rounded-t-[14px] ">
        <div className="w-full overflow-x-auto">
          <Toaster />

          <div className="w-full  ">
            {loading ? (
              <Spinner />
            ) : (
              <Table className={`${TABLE_CLASS}`}>
                <TableHeader>
                  <TableRow className={`${TABLE_HEADER_CLASS}`}>
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
                      Amount
                    </TableCell>
                    <TableCell
                      isHeader
                      className={`${TABLE_CELL_HEADER_CLASS}`}
                    >
                      EMI
                    </TableCell>
                    <TableCell
                      isHeader
                      className={`${TABLE_CELL_HEADER_CLASS}`}
                    >
                      status
                    </TableCell>

                    {loggedInUser?.role !== Roles.USER && (
                      <TableCell
                        isHeader
                        className={`${TABLE_CELL_HEADER_CLASS}`}
                      >
                        Action
                      </TableCell>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawals.length > 0 ? (
                    withdrawals.map((withdrawReqItem: any, index: number) => (
                      <TableRow
                        key={withdrawReqItem?.id}
                        className={`${TABLE_RAW_CLASS}`}
                      >
                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {(currentPage - 1) * ITEM_PER_PAGE + index + 1}
                          </span>
                        </TableCell>
                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                          {`${withdrawReqItem?.requestedBy?.firstName || ""} ${
                            withdrawReqItem?.requestedBy?.lastName || ""
                          }`}
                        </TableCell>
                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                          <span>{`${withdrawReqItem.amount || ""}`}</span>
                        </TableCell>
                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                          {`${withdrawReqItem.emiDurationMonths || ""}`}
                        </TableCell>
                        <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                          <Badge
                            size="sm"
                            color={mapStatusToVariant(
                              `${withdrawReqItem?.status || ""}`
                            )}
                          >
                            {`${withdrawReqItem?.status || ""}`}
                          </Badge>
                        </TableCell>

                        {(loggedInUser?.role === Roles.SALES_REP ||
                          loggedInUser?.role === Roles.ADMIN) && (
                                 <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                          {updatingWithdrawalReqId === withdrawReqItem.id ? (
                            <div className="flex items-center">
                              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                          ) : withdrawReqItem.status !== "FUNDED" ? (
                            <div className="relative">
                                <select
                                  value={withdrawReqItem?.status}
                                  onChange={(e) =>
                                    handleUpdateWithdrawalReqStatus(
                                      withdrawReqItem,
                                      e.target.value
                                    )
                                  }
                                  className={` appearance-none   px-4  py-2 pr-10  text-sm rounded-md text-gray-600  bg-white focus:outline-none`}
                                  disabled={statusUpdateLoading}
                                >
                                  {statusOptions.map((statusItem) => (
                                    <option key={statusItem.value} value={statusItem.value}>
                                      {statusItem.label}
                                    </option>
                                  ))}
                                </select>
                            
                              {/* Fixed label shown on top of select */}
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 py-2  flex items-center gap-2 flex-nowrap text-nowrap pointer-events-none text-sm font-medium  bg-white">
                                Update Status
                                <FaAngleDown className=" " />
                              </div>
                            </div>
                          ):( <Badge
                            size="sm"
                            color={mapStatusToVariant(
                              `${withdrawReqItem?.status || ""}`
                            )}
                          >
                            {`${withdrawReqItem?.status || ""}`}
                          </Badge>
                          )}
                        </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className={`${TABLE_RAW_CLASS}`}>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        No withdrawal request found.
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
      <div className=" w-full  md:px-3 py-5">
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

export default WithdrawalRequestsTable;
