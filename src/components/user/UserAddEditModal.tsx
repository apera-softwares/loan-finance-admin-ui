"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { Users1 } from "../../icons/index";
import {  REQUIRED_ERROR } from "@/constant/constantClassName";
import Select from "../form/Select";

import { CreateUser, UpdateUser } from "@/lib/redux/slices/userManagementSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import toast from "react-hot-toast";
import { fetchSalesReps } from "@/lib/redux/slices/salesRepSlice";


const Status = [
     { value: "PENDING", label: "Pending" },
     { value: "APPROVED", label: "Approved" },
     { value: "DECLINED", label: "Declined" },
     { value: "FUNDED", label: "Funded" },
     { value: "CANCELED", label: "Canceled" },

]

interface UserAddEditModalProps {
    isOpen: boolean;
    closeModal: () => void;
    userData?: any
    type?: string
}


const FORM_INPUT_CLASS = "w-full h-10 text-base bg-white border-b border-gray-200 focus:border-gray-300  text-gray-600 outline-none   transition-all duration-500 " ;
const FORM_INPUT_LABEL = " block w-full  text-sm font-medium text-gray-600";


const UserAddEditModal: React.FC<UserAddEditModalProps> = ({ isOpen, closeModal, userData, type }) => {

    console.log(userData, 'userDatasssss');


    const dispatch = useDispatch<AppDispatch>();

    const [salesReps, setSalesReps] = useState<any[]>([]);

    
    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone:"",
        password:"",
        status:"",
        availableCredit:"",
        interestRate:"",
        bankAccountNumber:"",
        routingNumber:"",
        assignedSalesRep:"",
        utilizedCredit:"",
    });

    const [errors, setErrors] = useState({
       id: "",
        firstName: '',
        lastName: "",
        email: "",
        phone:"",
        password:"",
         status:"",
        availableCredit:"",
        interestRate:"",
        bankAccountNumber:"",
        routingNumber:"",
        assignedSalesRep:"",
        utilizedCredit:"",
    })
    const isEditMode = type==="update" ? true : false ; 

    useEffect(() => {
        if (userData) {
            setFormData({
            id: userData?.id,
            firstName: userData?.firstName||"",
            lastName: userData?.lastName||"",
            email: userData?.email||"",
            phone:userData?.phone||"",
            password:userData?.password||"",
            status:userData?.UserDetails?.[0]?.status||"",
            availableCredit:userData?.UserDetails?.[0]?.availableCredit?.toString()||"",
            interestRate:userData?.UserDetails?.[0]?.interestRate?.toString()||"",
            bankAccountNumber:userData?.UserDetails?.[0]?.bankAccountNumber||"",
            routingNumber:userData?.UserDetails?.[0]?.routingNumber||"",
            assignedSalesRep:userData?.UserDetails?.[0]?.assignedSalesRep||"",
            utilizedCredit:userData?.UserDetails?.[0]?.utilizedCredit?.toString()||"",
            });
        }
    }, [userData]);


    useEffect(() => {
    dispatch(fetchSalesReps({ page: 1, limit: 1000, name:''})).then((res: any) => {
                    if (res.meta.requestStatus === "fulfilled") {
                        if (res.payload) {
                            setSalesReps(res.payload.data || []);                                                        
                        } else {
                            setSalesReps([]);
                        }
                    } else {
                        console.log("Failed to fetch users:", res.payload || "Unknown error");
                        setSalesReps([])
                    }
                });
        setSalesReps(salesReps);
        console.log(salesReps, "salesReps11111")
     }, []);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleEdit = () => {
        const payload={
            id:formData.id,
            firstName:formData.firstName,
            lastName:formData.lastName,
            email:formData.email,
            phone:formData.phone,
            availableCredit: parseFloat(formData.availableCredit)||undefined,
            interestRate: parseFloat(formData.interestRate)||undefined,
            assignedSalesRep:formData.assignedSalesRep||undefined,
            status:formData.status||undefined
        }
        
        console.log("user edit payload",payload);

        dispatch(UpdateUser(payload)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    toast.success("User Updated successfully");

                    console.log(res.payload)
                    closeModal();
                    clear()
                } else {
                }
            } else {
                console.log("Failed to Update User:", res.payload || "Unknown error");
                toast.error("Failed to Update user");

            }
        });
    };

    const handleAddUser = () => {
        const payload={
            firstName:formData.firstName,
            lastName:formData.lastName,
            email:formData.email,
            phone:formData.phone,
            password:formData.password,
            availableCredit: parseFloat(formData.availableCredit)||undefined,
            interestRate: parseFloat(formData.interestRate)||undefined,
            assignedSalesRep:formData.assignedSalesRep||undefined,
        }
        
        console.log("user create payload",payload);

        dispatch(CreateUser(payload)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    toast.success("User Created successfully");
                    console.log("User Created successful!");

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
            firstName: "",
            lastName: "",
            email: "",
            phone:"",
            password:"",
            status:"",
            availableCredit:"",
            interestRate:"",
            bankAccountNumber:"",
            routingNumber:"",
            assignedSalesRep:"",
             utilizedCredit:"",
            });

            setErrors({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone:"",
            password:"",
            status:"",
            availableCredit:"",
            interestRate:"",
            bankAccountNumber:"",
            routingNumber:"",
            assignedSalesRep:"",
             utilizedCredit:"",
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
                               
                                type==='add' ? "Create  User" : "Edit User"
                            }
                        </h5>
                    </div>
                </div>

                <div className="w-full">
                    <div className="max-h-[400px] overflow-y-auto space-y-6">

                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="w-full ">
                                <label className={FORM_INPUT_LABEL}>
                                 First Name
                                </label>
                                <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.firstName || ""}</span>
                            </div>

                             <div className="w-full ">
                                 <label className={FORM_INPUT_LABEL}>
                                 Last Name
                                </label>
                                <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.lastName || ""}</span>
                             </div>
                            <div className="w-full">
                                 <label className={FORM_INPUT_LABEL}>
                                 Email
                                </label>
                                <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.email || ""}</span>
                            </div>
                            <div className="w-full">
                                 <label className={FORM_INPUT_LABEL}>
                                 Phone
                                </label>
                                <input
                                type="text"
                                name="phone"
                                className={FORM_INPUT_CLASS}
                                value={formData.phone}
                                
                                 onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow only numbers and max 10 digits
                                    if (/^\d{0,10}$/.test(value)) {
                                    setFormData((prev) => ({ ...prev, phone: value }))
                                    }
                                    }}
                            />
                            <span className={REQUIRED_ERROR}>{errors.phone|| ""}</span>
                            </div>

                             {
                                type==="add" && ( <div className="w-full">
                                <label className={FORM_INPUT_LABEL}>
                                 Password
                                </label>
                                <input
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                                 />
                                 <span className={REQUIRED_ERROR}>{errors.password|| ""}</span>
                                 </div>
)
                             }

                             <div className="w-full">
                                 <label className={FORM_INPUT_LABEL}>
                                 Available Credit
                                </label>
                            <input
                                type="text"
                                name="availableFunding"
                                value={formData.availableCredit}
                                onChange={(e) => {
                                const value = e.target.value;
                                 // Allow only digits (optionally, you can add `.` if you want decimals)
                                if (/^\d*$/.test(value)) {
                                    setFormData((prev) => ({
                                                           ...prev,
                                                           availableCredit: value,
                                                           }));
                                }
                                }}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.availableCredit|| ""}</span>
                             </div>
                                <div className="w-full ">
                                <label className={FORM_INPUT_LABEL}>
                                 Interest Rate (%)
                                </label>
                               <input
                                type="text"
                                name="interestRate"
                                value={formData.interestRate}
                                onChange={(e) => {
                                const rateValue = e.target.value;
                                const interestRateRegex = /^\d{0,3}(\.\d{0,2})?$/;

                                 if (rateValue === "" || interestRateRegex.test(rateValue)) {
                                const numericValue = parseFloat(rateValue);
                                if (rateValue === "" || (numericValue >= 0 && numericValue <= 100)) {
                                setFormData((prev) => ({ ...prev, interestRate: rateValue }));
                                  }
                                 }
                                }}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.interestRate|| ""}</span>
                             </div>

                            <div className="w-full ">
                                <label className={FORM_INPUT_LABEL}>
                                 Assigned Sales Rep {salesReps?.length}
                                </label>

                                <select name="assignedSalesRep" 
                                className={FORM_INPUT_CLASS} onChange={handleSelectChange} value={formData.assignedSalesRep}>
                                    {salesReps?.map((_salesRep:any)=>(
                                        <option key={_salesRep.id} value={_salesRep.id}>{_salesRep.name}</option>
                                    ))}
                                </select>
                                {/* <input
                                type="text"
                                name="assignedSalesRep"
                                value={formData.assignedSalesRep}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            /> */}
                            <span className={REQUIRED_ERROR}>{errors.assignedSalesRep || ""}</span>
                            </div>
                      


                            {
                                type==="update" && <>


                                
                            <div className="w-full">
                            <label className={FORM_INPUT_LABEL}>
                                 Status 
                            </label>
                            <Select
                                options={Status}
                                defaultValue={formData.status}
                                placeholder="Select status"
                                onChange={(value: string) => setFormData((prev)=>({...prev,status:value}))}
                                className="dark:bg-dark-900"
                            />
                            <span className={REQUIRED_ERROR}>{errors.status || ""}</span>
                             </div>


                                <div className="w-full">
                                <label className={FORM_INPUT_LABEL}>
                                 Utilized Credit
                                </label>
                                 <input
                                type="text"
                                name="utilizedCredit"
                                value={formData.utilizedCredit}
                                readOnly={isEditMode}
                                onChange={(e) => {
                                const value = e.target.value;
                                 // Allow only digits (optionally, you can add `.` if you want decimals)
                                if (/^\d*$/.test(value)) {
                                    setFormData((prev) => ({
                                                           ...prev,
                                                           utilizedCredit: value,
                                                           }));
                                }
                                }}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.utilizedCredit|| ""}</span>
                            </div>

                            <div className="w-full">
                                <label className={FORM_INPUT_LABEL}>
                                 Bank Account Number
                                </label>
                                <input
                                type="text"
                                name="bankAccountNumber"
                                readOnly={isEditMode}
                                value={formData.bankAccountNumber}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.bankAccountNumber|| ""}</span>
                           </div>
                            <div className="w-full">

                                 <label className={FORM_INPUT_LABEL}>
                                 Routing Number
                                </label>
                                <input
                                type="text"
                                name="routingNumber"
                                readOnly={isEditMode}
                                value={formData.routingNumber}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.routingNumber|| ""}</span>
                            </div>
                                
                                </>
                            }

                     


                        </div>
                    </div>
                    <div className="flex items-center justify-end w-full gap-3 mt-8">
                    <Button size="sm" className="btn-primary" onClick={type==="add" ? handleAddUser:handleEdit}>
                        {
                            type==="add" ? "Create User" : "Update User"
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

export default UserAddEditModal;
