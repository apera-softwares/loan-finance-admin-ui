"use client";
import React from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

interface LogoutConfirmationModalProps {
    isOpen: boolean;
    closeModal: () => void;
    onLogoutConfirm: () => void;
    type: "Remove" | "Delete";
    name:string;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
    isOpen,
    closeModal,
    onLogoutConfirm,
    
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[500px] p-5 lg:p-10"
            
        >
          <div className="w-full  ">
              <div className="flex items-start">
             
                <div className="">
                    <h5 className="font-semibold text-gray-800 text-title-sm dark:text-white/90">
                      Confirm Logout
                     </h5>
                    <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
                        Are you sure you want to logout ?
                    </p>
                </div>
            </div>

            <div className="flex justify-end mt-6 gap-3">
                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                        onLogoutConfirm();
                        closeModal();
                    }}
                >
                    Yes
                </Button>
                <Button size="sm" variant="outline" onClick={closeModal}>
                    No
                </Button>
            </div>
          </div>
        </Modal>
    );
};

export default LogoutConfirmationModal;
