import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
// import { FiEdit } from "react-icons/fi";
// import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchSalesRepresentatives,deleteSalesRepresentative } from "@/lib/redux/slices/salesRepresentativeSlice";
import Spinner from "../common/Spinner";
import Pagination from "../tables/Pagination";
import SalesRepresentativeAddEditModal from "./SalesRepresentativeAddEditModal";
import DeleteConfirmModal from "../common/DeleteConfirmModal";
import toast, { Toaster } from "react-hot-toast";
import {TABLE_CLASS, TABLE_ACTION_BUTTON_CLASS,TABLE_CELL_HEADER_CLASS, TABLE_CELL_REGULAR_CLASS, TABLE_HEADER_CLASS, TABLE_RAW_CLASS } from "@/constant/constantClassName";

interface SalesRepresentativeTableProps {
  searchText: string;
  isCreateUserModalOpen?: boolean;
  from?: string;
}

const SalesRepresentativeTable: React.FC<SalesRepresentativeTableProps> = ({
  searchText,
  isCreateUserModalOpen,
}) => {
  const ITEM_PER_PAGE = 5;
  const dispatch = useAppDispatch();
  const { loading, salesRepresentativesList } = useAppSelector((state) => state.salesRepresentative);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedSalesRepData, setSelectedSalesRepData] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    getSalesRepresentatives(currentPage);
  }, [dispatch, currentPage, showAddEditModal, isCreateUserModalOpen]);

  useEffect(() => {
    setCurrentPage(1);
    getSalesRepresentatives(1);
  }, [dispatch, searchText]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const getSalesRepresentatives = async (page: number) => {
    try {
      const params = {
        page: page,
        limit: ITEM_PER_PAGE,
        name: searchText,
      };
      const res = await dispatch(fetchSalesRepresentatives(params)).unwrap();
      setTotalPages(res?.lastPage || 0);
    } catch (error: any) {
      setTotalPages(0);
      console.log(error?.message || "Failed to fetch sales representative");
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setShowDeleteConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    setDeleteLoading(true);
    try {
      await dispatch(deleteSalesRepresentative(selectedId)).unwrap();
      await getSalesRepresentatives(currentPage);
      toast.success("Deleted sales representative successfully");
    } catch (error: any) {
      console.error("Error while deleting sales representative:", error);
      toast.error(
        typeof error === "string"
          ? error
          : "Failed to delete sales representative"
      );
    } finally {
      setShowDeleteConfirmModal(false);
      setDeleteLoading(false);
      setSelectedId(null);
    }
  };

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
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className={`${TABLE_CELL_HEADER_CLASS}`}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    isHeader
                    className={`${TABLE_CELL_HEADER_CLASS}`}
                  >
                    Commission
                  </TableCell>
                  <TableCell
                    isHeader
                    className={`${TABLE_CELL_HEADER_CLASS}`}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesRepresentativesList && salesRepresentativesList.length > 0 ? (
                  salesRepresentativesList.map((user: any, index: number) => (
                    <TableRow key={user?.id} className={`${TABLE_RAW_CLASS}`}>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {(currentPage - 1) * ITEM_PER_PAGE + index + 1}
                        </span>
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        <span className="uppercase">
                          {`${user.firstName||""} ${user.lastName||""}`}
                        </span>
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        <span >
                          {`${user.email||""}`}
                        </span>
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                    
                          {`${user.phone||""}`}
                      
                      </TableCell>
                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        {user.commission ? `${user.commission} %` : "N/A"}
                      </TableCell>

                      <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                        <div className="flex items-center flex-nowrap gap-3">
                          <button
                            className={`${TABLE_ACTION_BUTTON_CLASS}`}
                            onClick={() => {
                              setSelectedSalesRepData(user);
                              setShowAddEditModal(true);
                            }}
                          >
    
                            Edit
                          </button>
                          <button
                            className={`${TABLE_ACTION_BUTTON_CLASS}`}
                            onClick={() => {
                              confirmDelete(user?.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className={`${TABLE_RAW_CLASS}`} >
                    <TableCell className={`${TABLE_CELL_REGULAR_CLASS}`}>
                      No sales representative found.
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
      <SalesRepresentativeAddEditModal
        isOpen={showAddEditModal}
        closeModal={() => {
          setShowAddEditModal(false);
          setSelectedSalesRepData(null);
        }}
        salesRepData={selectedSalesRepData}
        type="update"
      />
      <DeleteConfirmModal
        isOpen={showDeleteConfirmModal}
        closeModal={() => {
          setShowDeleteConfirmModal(false);
          setSelectedId(null);
        }}
        onDeleteConfirm={handleDelete}
        message="Are you sure you want to delete  sales representative ?"
        loading={deleteLoading}
      />
    </div>
  );
};

export default SalesRepresentativeTable;
