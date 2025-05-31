"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { Users1 } from "../../icons/index";
import { FORM_INPUT_CLASS, REQUIRED_ERROR } from "@/constant/constantClassName";
import Select from "../form/Select";

import { CreateUser, UpdateUser } from "@/lib/redux/slices/userManagementSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import toast from "react-hot-toast";

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

const UserAddEditModal: React.FC<UserAddEditModalProps> = ({ isOpen, closeModal, userData, type }) => {


    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone:"",
        password:"",
        status:"",
        availableFunding:"",
        interestRate:"",
        bankAccountNumber:"",
        routingNumber:"",
        assignedSalesRep:"",
        utilizedCredit:"",
        

    });

    const [errors, setErrors] = useState({
       id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone:"",
        password:"",
         status:"",
        availableFunding:"",
        interestRate:"",
        bankAccountNumber:"",
        routingNumber:"",
        assignedSalesRep:"",
        utilizedCredit:"",
    })
    const isEditMode = userData ? true : false ;



 

    useEffect(() => {
        if (userData) {
            setFormData({
            id: userData?.id,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            email: userData?.email,
            phone:userData?.phone,
            password:userData?.password||"",
            status:userData?.UserDetails?.[0]?.status||"",
            availableFunding:userData?.UserDetails?.[0]?.availableFunding?.toString()||"",
            interestRate:userData?.UserDetails?.[0]?.interestRate?.toString()||"",
            bankAccountNumber:userData?.UserDetails?.[0]?.bankAccountNumber||"",
            routingNumber:userData?.UserDetails?.[0]?.routingNumber||"",
            assignedSalesRep:userData?.UserDetails?.[0]?.assignedSalesRep||"",
            utilizedCredit:userData?.UserDetails?.[0]?.utilizedCredit?.toString()||"",
            });
        }
    }, [userData]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: "role" | "team", value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleVerifiedChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            verified: value === "yes",
        }));
    };

    const validateAddUserFormData = () => {
        let isValidData = true;
        const tempErrors = { ...errors };

        const nameRegex = /^[A-Za-z]+(-[A-Za-z]+)*$/;;
        // Validate firstName
        if (formData.firstName.trim() === "") {
            tempErrors.firstName = "First name is required";
            isValidData = false;
        } else if (!nameRegex?.test(formData.firstName)) {
            tempErrors.firstName = "Please enter valid first name";
            isValidData = false;
        } else {
            tempErrors.firstName = "";
        }

        // Validate lastName
        if (formData?.lastName.trim() === "") {
            tempErrors.lastName = "Last name is required";
            isValidData = false;
        } else if (!nameRegex?.test(formData.lastName)) {
            tempErrors.lastName = "Please enter valid last name";
            isValidData = false;
        } else {
            tempErrors.lastName = "";
        }

        // Validate email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (formData.email.trim() === "") {
            tempErrors.email = "Email is required";
            isValidData = false;
        } else if (!emailRegex?.test(formData.email)) {
            tempErrors.email = "Please enter a valid email";
            isValidData = false;
        } else {
            tempErrors.email = "";
        }


        if (formData.phone.trim() === "") {
         tempErrors.phone = "Phone number is required";
         isValidData = false;
        } else if (formData.phone.length < 10) {
         tempErrors.phone = "Please enter a valid phone number";
          isValidData = false;
        } else {
         tempErrors.phone = "";
         }


            //validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (formData.password.trim() === "") {
            tempErrors.password = "Password is required";
            isValidData = false;
        } else if (!passwordRegex.test(formData.password)) {
            tempErrors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
            isValidData = false;
        } else {
            tempErrors.password = "";
        }

        //validate status
        if (formData.status.trim() === "") {
            tempErrors.status = "Status is required";
            isValidData = false;
        }else {
            tempErrors.status = "";
        }



        setErrors(tempErrors);
        return isValidData;

    };

      const validateEditUserFormData = () => {
        let isValidData = true;
        const tempErrors = { ...errors };


     
        //validate status
        if (formData.status.trim() === "") {
            tempErrors.status = "Status is required";
            isValidData = false;
        }else {
            tempErrors.status = "";
        }



        setErrors(tempErrors);
        return isValidData;

    };


    const handleEdit = () => {
        console.log("Form Data: Update User", formData);
           const transformPayload={
            ...formData,
            interestRate: parseFloat(formData.interestRate)||0,
            availableFunding: parseFloat(formData.availableFunding)||0,
            utilizedCredit: parseFloat(formData.utilizedCredit)||0,
        }
       if (!validateEditUserFormData()){
        console.log("validation failed",);
        return ;
       }
        dispatch(UpdateUser(transformPayload)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    toast.success("User Updated successful!");

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
        const transformPayload={
            ...formData,
            interestRate: parseFloat(formData.interestRate)||0,
            availableFunding: parseFloat(formData.availableFunding)||0,
            utilizedCredit: parseFloat(formData.utilizedCredit)||0,
        }
        
        // console.log("trnansformform data",transformPayload);
        if (!validateAddUserFormData()) return;
        dispatch(CreateUser(transformPayload)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    toast.success("User Created successful!");
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
            availableFunding:"",
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
            availableFunding:"",
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

    console.log("user data",userData);
    console.log("form data",formData);
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
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                readOnly={isEditMode}
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.firstName || ""}</span>
                            </div>

                             <div className="w-full ">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                readOnly={isEditMode}
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.lastName || ""}</span>
                             </div>
                            <div className="w-full">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                readOnly={isEditMode}
                                value={formData.email}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.email || ""}</span>
                            </div>
                            <div className="w-full">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                className={FORM_INPUT_CLASS}
                                readOnly={isEditMode}
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
                                !isEditMode && ( <div className="w-full">
                                <input
                                type="text"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                                 />
                                 <span className={REQUIRED_ERROR}>{errors.password|| ""}</span>
                                 </div>
)
                             }

                            <div className="w-full">
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
                            <input
                                type="text"
                                name="availableFunding"
                                placeholder="Available Funding"
                                value={formData.availableFunding}
                                onChange={(e) => {
                                const value = e.target.value;
                                 // Allow only digits (optionally, you can add `.` if you want decimals)
                                if (/^\d*$/.test(value)) {
                                    setFormData((prev) => ({
                                                           ...prev,
                                                           availableFunding: value,
                                                           }));
                                }
                                }}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.availableFunding|| ""}</span>
                             </div>
                            <div className="w-full">
                            <input
                                type="text"
                                name="utilizedCredit"
                                placeholder="Utilized credit"
                                value={formData.utilizedCredit}
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

                            <div className="w-full ">
                            <input
                                type="text"
                                name="interestRate"
                                placeholder="Interest rate"
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
                            <input
                                type="text"
                                name="assignedSalesRep"
                                placeholder="Assigned sales rep"
                                value={formData.assignedSalesRep}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.assignedSalesRep || ""}</span>
                            </div>

                            <div className="w-full">
                            <input
                                type="text"
                                name="bankAccountNumber"
                                placeholder="Bank account number"
                                value={formData.bankAccountNumber}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.bankAccountNumber|| ""}</span>
                           </div>
                            <div className="w-full">
                            <input
                                type="text"
                                name="routingNumber"
                                placeholder="Routing number"
                                value={formData.routingNumber}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.routingNumber|| ""}</span>
                            </div>

                        </div>
                   
                   
        
     
          
                      
                     

                 


    

                

               
                    </div>
                </div>

                <div className="flex items-center justify-end w-full gap-3 mt-8">
                    <Button size="sm" onClick={type==="add" ? handleAddUser:handleEdit}>
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
        </Modal>
    );
};

export default UserAddEditModal;
