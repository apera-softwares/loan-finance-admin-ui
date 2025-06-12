"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { UserProfile } from "../../icons/index";
import {MODAL_FORM_INPUT_CLASS,MODAL_INPUT_LABEL_CLASS, REQUIRED_ERROR } from "@/constant/constantClassName";
import { createSalesRepresentative,updateSalesRepresentative } from "@/lib/redux/slices/salesRepresentativeSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { Roles } from "@/constant/roles";
import toast,{Toaster} from "react-hot-toast";

interface SalesRepresentativeAddEditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  salesRepData?: any;
  type?: string;
}

interface FormData {
  id?:string,
  firstName:string;
  lastName:string;
  email:string;
  phone:string;
  password?:string;
  commission:string;
}

const SalesRepresentativeAddEditModal: React.FC<
  SalesRepresentativeAddEditModalProps
> = ({ isOpen, closeModal, salesRepData, type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<FormData>({
    id: "",
    firstName: "",
    lastName:"",
    email:"",
    phone:"",
    password:"",
    commission: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName:"",
    email:"",
    phone:"",
    password:"",
    commission: "",
  });

  useEffect(() => {
    if (salesRepData) {
      setFormData({
           id: salesRepData?.id||"",
           firstName:salesRepData.firstName||"",
           lastName:salesRepData.lastName||"",
           email:salesRepData.email||"",
           phone:salesRepData.phone||"",
           commission: salesRepData?.commission || "",
      });
    }
  }, [salesRepData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


    const validateFormData = () => {
    let isValidData = true;
    const tempErrors = { ...errors };

    // const nameRegex = /^[A-Za-z]+(-[A-Za-z]+)*$/;;
    // Validate firstName
    if (formData.firstName.trim() === "") {
      tempErrors.firstName = "First name is required";
      isValidData = false;
    } else {
      tempErrors.firstName = "";
    }

    // Validate lastName
    if (formData.lastName.trim() === "") {
      tempErrors.lastName = "Last name is required";
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

    // Validate phone
    if (formData.phone.trim() === "") {
      tempErrors.phone = "Phone number is required";
      isValidData = false;
    } else if (formData.phone.length < 10) {
      tempErrors.phone = "Please enter a valid phone number";
      isValidData = false;
    } else {
      tempErrors.phone = "";
    }

    if (type === "add") {
      // validate password
      if (formData?.password?.trim() === "") {
        tempErrors.password = "Password is required";
        isValidData = false;
      } else { 
        tempErrors.password = "";
      }
    }

    if (formData.commission?.trim() === "") {
        tempErrors.commission = "Commission is required";
        isValidData = false;
    } else { 
        tempErrors.commission = "";
    }

    setErrors(tempErrors);
    return isValidData;
  };

  const handleAdd = async () => {
    if(!validateFormData()) return ;
    try {
      const addPayload = {
        firstName:formData.firstName,
        lastName:formData.lastName,
        email:formData.email,
        phone:formData.phone,
        password:formData.password,
        commission: formData.commission,
        role:Roles.SALES_REP,
      };
      await dispatch(createSalesRepresentative(addPayload)).unwrap();
      toast.success("Created sales representative successfully");
      handleModalClose();
    } catch (error: any) {
      console.error("Error while creating sales representative:", error);
      toast.error(
        typeof error === "string"
          ? error
          : "Failed to create sales representative"
      );
    } finally {
     
    }
  };

  const handleEdit = async () => {

    if(!validateFormData()) return ;
    try {
      const editPayload = {
        id: salesRepData?.id,
        firstName:formData.firstName,
        lastName:formData.lastName,
        email:formData.email,
        phone:formData.phone,
        commission: formData.commission,
        role:Roles.SALES_REP,
      };

      await dispatch(updateSalesRepresentative(editPayload)).unwrap();
      toast.success("Updated sales representative successfully");
      handleModalClose();
    } catch (error: any) {
      console.error("Error while updating sales representative:", error);
      toast.error(
        typeof error === "string"
          ? error
          : "Failed to update sales representative"
      );
    } finally {
    }
  };

  const clear = () => {
    setFormData({
      id: "",
      firstName: "",
      lastName:"",
      email:"",
      phone:"",
      password:"",
      commission: "",
    });

    setErrors({
      firstName: "",
      lastName:"",
      email:"",
      phone:"",
      password:"",
      commission: "",
    });
  };

  const handleModalClose = () => {
    closeModal();
    clear();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleModalClose();
      }}
      className="max-w-[800px] p-6 lg:p-10 pt-10 "
    >
      <Toaster />

      <div className="w-full">
        <div className="w-full flex items-center mb-6 md:mb-8">
          <span className="flex justify-center items-center rounded-full">
            <UserProfile />
          </span>
          <div className="ml-4 md:ml-6 w-full">
            <h5 className="font-semibold text-gray-800 text-xl sm:text-2xl lg:text-3xl dark:text-white/90">
              {type === "add"
                ? "Create Sales Representative"
                : "Edit Sales Representative"}
            </h5>
          </div>
        </div>

        <div className="w-full">
          <div className=" max-h-[320px] overflow-y-auto  ">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="w-full ">
                <label className={MODAL_INPUT_LABEL_CLASS}>First Name</label>
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
                <label className={MODAL_INPUT_LABEL_CLASS}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={MODAL_FORM_INPUT_CLASS}
                />
                <span className={REQUIRED_ERROR}>
                  {errors.lastName || ""}
                </span>
              </div>
              <div className="w-full ">
                <label className={MODAL_INPUT_LABEL_CLASS}>Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={MODAL_FORM_INPUT_CLASS}
                />
                <span className={REQUIRED_ERROR}>{errors.email || ""}</span>
              </div>
              <div className="w-full ">
                <label className={MODAL_INPUT_LABEL_CLASS}>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numbers and max 10 digits
                      if (/^\d{0,10}$/.test(value)) {
                        setFormData((prev) => ({ ...prev, phone: value }))
                      }
                  }}
                  className={MODAL_FORM_INPUT_CLASS}
                />
                <span className={REQUIRED_ERROR}>{errors.phone || ""}</span>
              </div>
              {
                type === "add" && (   <div className="w-full ">
                <label className={MODAL_INPUT_LABEL_CLASS}>Password</label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={MODAL_FORM_INPUT_CLASS}
                />
                <span className={REQUIRED_ERROR}>
                  {errors.password || ""}
                </span>
              </div>)
              }
              <div className="w-full ">
                <label className={MODAL_INPUT_LABEL_CLASS}>Commission</label>
                <input
                  type="text"
                  name="commission"
                  value={formData.commission}
                      onChange={(e) => {
                    const rateValue = e.target.value;
                    const commissionRateRegex = /^\d{0,3}(\.\d{0,2})?$/;

                    if (
                      rateValue === "" ||
                      commissionRateRegex.test(rateValue)
                    ) {
                      const numericValue = parseFloat(rateValue);
                      if (
                        rateValue === "" ||
                        (numericValue >= 0 && numericValue <= 100)
                      ) {
                        setFormData((prev) => ({
                          ...prev,
                          commission: rateValue,
                        }));
                      }
                    }
                  }}
                  className={MODAL_FORM_INPUT_CLASS}
                />
                <span className={REQUIRED_ERROR}>{errors.commission || ""}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-end w-full gap-3 mt-8 lg:mt-10">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                handleModalClose();
              }}
            >
              Cancel
            </Button>
              <Button size="sm" onClick={type === "add" ? handleAdd : handleEdit}>
              {type === "add" ? "Create User" : "Update User"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SalesRepresentativeAddEditModal;
