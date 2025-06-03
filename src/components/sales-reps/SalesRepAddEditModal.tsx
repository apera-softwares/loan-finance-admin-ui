"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import {  REQUIRED_ERROR } from "@/constant/constantClassName";

// import {  } from "@/lib/redux/slices/salesRepSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import toast from "react-hot-toast";
import { CreateSalesReps, UpdateSalesReps } from "@/lib/redux/slices/salesRepSlice";
import { Users1 } from "@/icons";



interface SalesRepsAddEditModalProps {
    isOpen: boolean;
    closeModal: () => void;
    userData?: any
    type?: string
}


const FORM_INPUT_CLASS = "w-full h-10 text-base bg-white border-b border-gray-200 focus:border-gray-300  text-gray-600 outline-none   transition-all duration-500 " ;
const FORM_INPUT_LABEL = " block w-full  text-sm font-medium text-gray-600";


const SalesRepsAddEditModal: React.FC<SalesRepsAddEditModalProps> = ({ isOpen, closeModal, userData, type }) => {


    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        commission: ""       

    });

    const [errors, setErrors] = useState({
       id: "",
        name: "",
        commission: "" 
    })

 

    useEffect(() => {
        if (userData) {
            setFormData({
            id: userData?.id,
            name: userData.name,
            commission: userData.commission
            });
        }
    }, [userData]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleEdit = () => {
        const payload={
            id:formData.id,
            name: formData.name,
        commission: formData.commission 
        }
        
        console.log("user edit payload",payload);

        dispatch(UpdateSalesReps(payload)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    toast.success("SalesReps Updated successfully");

                    console.log(res.payload)
                    closeModal();
                    clear()
                } else {
                }
            } else {
                console.log("Failed to Update SalesReps:", res.payload || "Unknown error");
                toast.error("Failed to Update user");

            }
        });
    };

    const handleAddSalesReps = () => {
        const payload={
            name: formData.name,
            commission: formData.commission 
        }
        
        console.log("user create payload",payload);

        dispatch(CreateSalesReps(payload)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    toast.success("SalesReps Created successfully");
                    console.log("SalesReps Created successful!");

                    console.log(res.payload)
                    closeModal();
                    clear()
                } else {
                }
            } else {
                console.log("Failed to Create user:", res.payload || "Unknown error");
                toast.error("Failed to Create user");
            }
        });
    }

    const clear = () => {
        setFormData({
            id: "",
            name: "",
            commission: ""
            });

            setErrors({
            id: "",
            name: "",
            commission: ""
            });
    }

    const handleModalClose = ()=>{

          clear();
          closeModal();
    }

    //console.log("user data",userData);
    //console.log("form data",formData);
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
            handleModalClose();
            }}
            className="max-w-[800px] p-6 lg:p-10 pt-10 "
        >
            {/* <Toaster /> */}

            <div className="w-full">
                <div className="w-full flex items-center mb-6">
                    <span className="bg-primary p-1  flex justify-center items-center rounded-full">
                        <Users1 />
                    </span>
                    <div className="ml-4 w-4/5">
                        <h5 className="font-semibold text-gray-800 text-xl sm:text-2xl lg:text-3xl dark:text-white/90">
                            {
                               
                                type==='add' ? "Create  SalesReps" : "Edit SalesReps"
                            }
                        </h5>
                    </div>
                </div>

                <div className="w-full">
                    <div className="max-h-[400px] overflow-y-auto space-y-6">

                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="w-full ">
                                <label className={FORM_INPUT_LABEL}>
                                 Name
                                </label>
                                <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.name || ""}</span>
                            </div>

                             <div className="w-full ">
                                 <label className={FORM_INPUT_LABEL}>
                                 Commisiion
                                </label>
                                <input
                                type="number"
                                name="commission"
                                value={formData.commission}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.commission || ""}</span>
                             </div>      


                     


                        </div>
                   
                   
        
     
          
                      
                     

                 


    

                

               
                    </div>
                    <div className="flex items-center justify-end w-full gap-3 mt-8">
                    <Button size="sm" onClick={type==="add" ? handleAddSalesReps:handleEdit}>
                        {
                            type==="add" ? "Create SalesReps" : "Update SalesReps"
                        }
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                        handleModalClose();
                      
                    }}>
                        Cancel
                    </Button>
                    </div>
                </div>

             

            </div>
        </Modal>
    );
};

export default SalesRepsAddEditModal;
