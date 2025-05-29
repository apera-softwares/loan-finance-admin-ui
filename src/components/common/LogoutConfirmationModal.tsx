"use client";
import React from "react";
import ReactDOM from 'react-dom';
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

interface LogoutConfirmationModalProps {
    isOpen: boolean;
    closeModal: () => void;
    onLogoutConfirm: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
    isOpen,
    closeModal,
    onLogoutConfirm,
    
}) => {
    return ( ReactDOM.createPortal(   
            <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className=" max-w-md  p-6 lg:p-10 pt-10 "
            
        >
          <div className="w-full ">
             
                <div className="w-full mb-6">
                    <h5 className="font-semibold text-gray-800 text-2xl sm:text-3xl dark:text-white/90">
                      Confirm Logout
                     </h5>
                    <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
                        Are you sure you want to logout ?
                    </p>
                </div>
                <div className="flex justify-end  gap-3">
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
        </Modal>,document.body)
     
    );
};

export default LogoutConfirmationModal;
