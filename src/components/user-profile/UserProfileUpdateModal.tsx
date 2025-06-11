"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { MODAL_FORM_INPUT_CLASS,MODAL_INPUT_LABEL_CLASS, REQUIRED_ERROR } from "@/constant/constantClassName";
//import {  UpdateUser } from "@/lib/redux/slices/userManagementSlice";
//import { useAppDispatch,useAppSelector } from "@/lib/redux/hooks";
import {Toaster} from "react-hot-toast";


interface UserAddEditModalProps {
    isOpen: boolean;
    closeModal: () => void;
    userProfileData:any,
}



const UserProfileUpdateModal: React.FC<UserAddEditModalProps> = ({ isOpen, closeModal, userProfileData }) => {

    //const dispatch = useAppDispatch();
    //const loggedInUser = useAppSelector((state)=>state.user.user);
    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone:"",
        role:"",
    });

    const [errors, setErrors] = useState({
       id: "",
        firstName: '',
        lastName: "",
        email: "",
        phone:"",
        role:"",
    })


    useEffect(() => {
        if (userProfileData) {
            setFormData({
            id: userProfileData?.id,
            firstName: userProfileData?.firstName||"",
            lastName: userProfileData?.lastName||"",
            email: userProfileData?.email||"",
            phone:userProfileData?.phone||"",
            role:userProfileData?.role||"",
            });

        }
    }, [userProfileData]);
   


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    // const handleEdit = () => {

    //     const payload={

    //         id:formData.id,
    //         firstName:formData.firstName,
    //         lastName:formData.lastName,
    //         email:formData.email,
    //         phone:formData.phone,
    //         role:loggedInUser?.role,
    //     }
        

    //     dispatch(UpdateUser(payload)).then((res: any) => {
    //         if (res.meta.requestStatus === "fulfilled") {
    //             if (res.payload) {
    //                 toast.success("User Updated successfully");

    //                 console.log(res.payload)
    //                 closeModal();
    //                 clear()
    //             } else {
    //             }
    //         } else {
    //             console.log("Failed to Update User:", res.payload || "Unknown error");
    //              toast.error(res.payload||"Something went wrong");

    //         }
    //     });
    // };

    const clear = () => {
        setFormData({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone:"",
            role:"",
      
            });

            setErrors({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone:"",
            role:"",
            });
    }

    const handleModalClose = ()=>{

          clear();
          closeModal();
    }


    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
            handleModalClose();
            }}
            className="max-w-[800px] px-6 py-10 lg:px-10 "
        >
            <Toaster />

            <div className="w-full">
                <div className="w-full flex items-center mb-6 md:mb-8 ">
                 
                    <div className=" w-full">
                        <h5 className="font-semibold text-gray-800 text-xl sm:text-2xl  dark:text-white/90 mb-1">
                         Edit Personal Information
                        </h5>
                        <p className="text-sm text-gray-600">Update your details to keep your profile up-to-date.
                       </p>
                    </div>
                </div>

                <div className="w-full ">
                    <div className="max-h-[320px] overflow-y-auto mb-8 lg:mb-10 ">
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="w-full ">
                                <label className={MODAL_INPUT_LABEL_CLASS}>
                                 First Name
                                </label>
                                <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={MODAL_FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.firstName || ""}</span>
                            </div>

                             <div className="w-full ">
                                 <label className={MODAL_INPUT_LABEL_CLASS}>
                                 Last Name
                                </label>
                                <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={MODAL_FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.lastName || ""}</span>
                             </div>
                            <div className="w-full">
                                 <label className={MODAL_INPUT_LABEL_CLASS}>
                                 Email
                                </label>
                                <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={MODAL_FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.email || ""}</span>
                            </div>
                            <div className="w-full">
                                 <label className={MODAL_INPUT_LABEL_CLASS}>
                                 Phone
                                </label>
                                <input
                                type="text"
                                name="phone"
                                className={MODAL_FORM_INPUT_CLASS}
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
                            <div className="w-full">
                                <label className={MODAL_INPUT_LABEL_CLASS}>
                                 Role
                                </label>
                                <input
                                type="text"
                                name="role"
                                readOnly
                                className={MODAL_FORM_INPUT_CLASS}
                                value={formData.role}
                                
                            />
                            <span className={REQUIRED_ERROR}>{errors.phone|| ""}</span>
                            </div>
                    


                        </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-end w-full gap-3">
                      <Button size="sm" variant="outline" onClick={() => {
                        handleModalClose();
                      
                    }}>
                        Cancel
                    </Button> 
                    <Button size="sm" className="" onClick={()=>{}}>
                      Save Changes
                    </Button>
            
                    </div>
                </div>

             

            </div>
        </Modal>
    );
};

export default UserProfileUpdateModal;
