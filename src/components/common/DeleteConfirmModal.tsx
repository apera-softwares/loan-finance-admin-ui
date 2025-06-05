"use client";
import React from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { TrashBinIcon } from "../../icons/index";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  closeModal: () => void;
  message: string;
  onDeleteConfirm: () => void;
  loading?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  closeModal,
  message,
  onDeleteConfirm,
  loading,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-[500px] p-6 lg:p-10 pt-10"
    >
      <div className="w-full">
        <div className="flex items-start">
          <div className="flex justify-center items-center p-3 rounded-full bg-red-100 dark:bg-red-500/10">
            <TrashBinIcon className=" text-red-600 dark:text-red-400" />
          </div>
          <div className="ml-4">
            <h5 className="font-semibold text-gray-800 text-2xl sm:text-2xl  dark:text-white/90">
              Delete Confirmation
            </h5>
            <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
              {message}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              onDeleteConfirm();
            }}
            disabled={loading}
          >
            {loading ? (
              <div className=" w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin "></div>
            ) : (
              "Yes"
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={closeModal}
            disabled={loading}
          >
            No, Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
