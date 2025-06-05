import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchSalesRepresentatives,deleteSalesRepresentative } from "@/lib/redux/slices/salesRepresentativeSlice";
import Spinner from "../common/Spinner";
import Pagination from "../tables/Pagination";
import SalesRepresentativeAddEditModal from "./SalesRepresentativeAddEditModal";
import DeleteConfirmModal from "../common/DeleteConfirmModal";
import toast, { Toaster } from "react-hot-toast";

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
  const [editUserData, setEditUserData] = useState<any | null>(null);
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
    <div className="w-full overflow-hidden rounded-xl bg-white dark:bg-white/[0.03] shadow-md">
      <div className="w-full overflow-x-auto">
        <Toaster />

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
                  <TableCell
                    isHeader
                    className="px-5 py-4 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                  >
                    Commission
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-4 font-medium text-[#1F1C3B] text-start text-theme-sm dark:text-gray-400"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesRepresentativesList.length > 0 ? (
                  salesRepresentativesList.map((user: any, index: number) => (
                    <TableRow key={user?.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {(currentPage - 1) * ITEM_PER_PAGE + index + 1}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <span className="uppercase">
                          {`${user.firstName||""} ${user.lastName||""}`}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <span >
                          {`${user.email||""}`}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    
                          {`${user.phone||""}`}
                      
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {user.commission ? `${user.commission} %` : "N/A"}
                      </TableCell>

                      <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <div className="flex items-center flex-nowrap gap-3">
                          <button
                            className="flex items-center cur "
                            onClick={() => {
                              setEditUserData(user);
                              setShowAddEditModal(true);
                            }}
                          >
                            <FiEdit className="text-xl mr-1" />
                            Edit
                          </button>
                          <button
                            className="flex items-center"
                            onClick={() => {
                              confirmDelete(user?.id);
                            }}
                          >
                            <RiDeleteBin6Line className="text-xl mr-1" />
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-center py-6 text-gray-500">
                      No sales representative found.
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
      <SalesRepresentativeAddEditModal
        isOpen={showAddEditModal}
        closeModal={() => {
          setShowAddEditModal(false);
        }}
        userData={editUserData}
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
