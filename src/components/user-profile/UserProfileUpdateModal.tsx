"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import {
  MODAL_FORM_INPUT_CLASS,
  MODAL_INPUT_LABEL_CLASS,
  REQUIRED_ERROR,
} from "@/constant/constantClassName";
import { UpdateUser } from "@/lib/redux/slices/userManagementSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import toast, { Toaster } from "react-hot-toast";
import { getUserProfile } from "@/lib/redux/slices/loginPersonProfile";

interface UserAddEditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  userProfileData: any;
}

const UserProfileUpdateModal: React.FC<UserAddEditModalProps> = ({
  isOpen,
  closeModal,
  userProfileData,
}) => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userProfileData) {
      setFormData({
        id: loggedInUser.userId,
        firstName: userProfileData?.firstName || "",
        lastName: userProfileData?.lastName || "",
        email: userProfileData?.email || "",
        phone: userProfileData?.phone || "",
        role: userProfileData?.role || "",
      });
    }
  }, [isOpen, userProfileData]);

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
        } else if(formData.phone.length < 10 ){
            tempErrors.phone = "Please enter a valid phone number";
            isValidData = false;
        }
         else {
            tempErrors.phone = "";
        }

        setErrors(tempErrors);
        return isValidData;

    };

  const handleUpdateUserProfile = async () => {

    if(!validateFormData()) return ;
    try {
      setLoading(true);
      const payload = {
        id: loggedInUser.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };

      await dispatch(UpdateUser(payload)).unwrap();
      await dispatch(getUserProfile()).unwrap();

      toast.success("Updated user profile successfully");

      handleModalClose();

    } catch (error: any) {
      console.error("Error while updating user profile", error);
      toast.error(
        typeof error === "string" ? error : "Failed to update user profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setFormData({
      id: loggedInUser.userId,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: userProfileData.role,
    });

    setErrors({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
    });
  };

  const handleModalClose = () => {
    clear();
    closeModal();
  };

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
            <p className="text-sm text-gray-600">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
        </div>

        <div className="w-full ">
          <div className="max-h-[280px] overflow-y-auto mb-8 lg:mb-10 ">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
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
                <span className={REQUIRED_ERROR}>{errors.lastName || ""}</span>
              </div>
              <div className="w-full">
                <label className={MODAL_INPUT_LABEL_CLASS}>Email</label>
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
                <label className={MODAL_INPUT_LABEL_CLASS}>Phone</label>
                <input
                  type="text"
                  name="phone"
                  className={MODAL_FORM_INPUT_CLASS}
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numbers and max 10 digits
                    if (/^\d{0,10}$/.test(value)) {
                      setFormData((prev) => ({ ...prev, phone: value }));
                    }
                  }}
                />
                <span className={REQUIRED_ERROR}>{errors.phone || ""}</span>
              </div>
              <div className="w-full">
                <label className={MODAL_INPUT_LABEL_CLASS}>Role</label>
                <input
                  type="text"
                  name="role"
                  readOnly
                  className={`${MODAL_FORM_INPUT_CLASS} cursor-not-allowed `}
                  value={formData.role}
                />
                <span className={REQUIRED_ERROR}>{}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-end w-full gap-3">
            <Button
              size="sm"
              variant="outline"
              disabled={loading}
              onClick={handleModalClose}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={loading}
              onClick={handleUpdateUserProfile}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfileUpdateModal;
