"use client";
import React from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { TrashBinIcon } from "../../icons/index";

interface TeamDeleteConfirmProps {
    isOpen: boolean;
    closeModal: () => void;
    onDeleteConfirm: () => void;
    type: "Remove" | "Delete";
    name:string;
}

const TeamDeleteConfirm: React.FC<TeamDeleteConfirmProps> = ({
    isOpen,
    closeModal,
    onDeleteConfirm,
    type="Delete",
    name="Team"
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[500px] p-5 lg:p-10"
        >
            <div className="flex items-start">
                <div className="flex justify-center items-center p-4 rounded-full bg-red-100 dark:bg-red-500/10">
                    <TrashBinIcon className=" text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-4">
                    <h5 className="font-semibold text-gray-800 text-title-sm dark:text-white/90">
                     {type} {name}
                     </h5>
                    <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
                        Are you sure you want to {type} this {name}? This action cannot be undone.
                    </p>
                </div>
            </div>

            <div className="flex justify-end mt-6 gap-3">
                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                        onDeleteConfirm();
                        closeModal();
                    }}
                >
                    Yes, {type}
                </Button>
                <Button size="sm" variant="outline" onClick={closeModal}>
                    No, Cancel
                </Button>
            </div>
        </Modal>
    );
};

export default TeamDeleteConfirm;
