"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { Users1 } from "../../icons/index";
import { REQUIRED_ERROR } from "@/constant/constantClassName";
import { createSalesRepresentative,updateSalesRepresentative } from "@/lib/redux/slices/salesRepresentativeSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { Roles } from "@/constant/roles";
import toast,{Toaster} from "react-hot-toast";

interface SalesRepresentativeAddEditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  userData?: any;
  type?: string;
}

const FORM_INPUT_CLASS =
  "w-full h-10 text-base bg-white border-b border-gray-200 focus:border-gray-300  text-gray-600 outline-none   transition-all duration-500 ";
const FORM_INPUT_LABEL = " block w-full  text-sm font-medium text-gray-600";


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
> = ({ isOpen, closeModal, userData, type }) => {
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
    if (userData) {
      setFormData({
           id: userData?.id||"",
           firstName:userData.firstName||"",
           lastName:userData.lastName||"",
           email:userData.email||"",
           phone:userData.phone||"",
           commission: userData?.commission || "",
      });
    }
  }, [userData, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
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
    try {
      const editPayload = {
        id: userData?.id,
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
        <div className="w-full flex items-center mb-6">
          <span className="bg-primary p-1  flex justify-center items-center rounded-full">
            <Users1 />
          </span>
          <div className="ml-4 w-4/5">
            <h5 className="font-semibold text-gray-800 text-xl sm:text-2xl lg:text-3xl dark:text-white/90">
              {type === "add"
                ? "Create Sales Representative"
                : "Edit Sales Representative"}
            </h5>
          </div>
        </div>

        <div className="w-full">
          <div className="max-h-[400px] overflow-y-auto space-y-6">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="w-full ">
                <label className={FORM_INPUT_LABEL}>First Name</label>
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
                <label className={FORM_INPUT_LABEL}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={FORM_INPUT_CLASS}
                />
                <span className={REQUIRED_ERROR}>
                  {errors.lastName || ""}
                </span>
              </div>
              <div className="w-full ">
                <label className={FORM_INPUT_LABEL}>Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={FORM_INPUT_CLASS}
                />
                <span className={REQUIRED_ERROR}>{errors.email || ""}</span>
              </div>
              <div className="w-full ">
                <label className={FORM_INPUT_LABEL}>Phone Number</label>
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
                  className={FORM_INPUT_CLASS}
                />
                <span className={REQUIRED_ERROR}>{errors.phone || ""}</span>
              </div>
              {
                type === "add" && (   <div className="w-full ">
                <label className={FORM_INPUT_LABEL}>Password</label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={FORM_INPUT_CLASS}
                />
                <span className={REQUIRED_ERROR}>
                  {errors.password || ""}
                </span>
              </div>)
              }
              <div className="w-full ">
                <label className={FORM_INPUT_LABEL}>Commission</label>
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
                  className={FORM_INPUT_CLASS}
                />
                <span className={REQUIRED_ERROR}>{errors.commission || ""}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end w-full gap-3 mt-8">
            <Button size="sm" onClick={type === "add" ? handleAdd : handleEdit}>
              {type === "add" ? "Create" : "Update"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                handleModalClose();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SalesRepresentativeAddEditModal;
