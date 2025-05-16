"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { Users1 } from "../../icons/index";
import { FORM_INPUT_CLASS, REQUIRED_ERROR } from "@/constant/constantClassName";
import Select from "../form/Select";
import Radio from "../form/input/Radio";
import Checkbox from "../form/input/Checkbox";
import { UpdateUser } from "@/lib/redux/slices/userManagementSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import toast from "react-hot-toast";

const Role = [
    { value: "ADMIN", label: "Admin" },
    { value: "A_TEAM", label: "Team A" },
    { value: "B_TEAM", label: "Team B" },
];

const Teams = [
    { value: "A_TEAM", label: "Team A" },
    { value: "B_TEAM", label: "Team B" },
];

interface UserAddEditModalProps {
    isOpen: boolean;
    closeModal: () => void;
    userData?: any
    type?: string
}

const UserAddEditModal: React.FC<UserAddEditModalProps> = ({ isOpen, closeModal, userData, type }) => {
    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        team: "",
        status: false,
        sendWelcomeEmail: true,
    });
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (userData) {
            setFormData({
                id: userData?.id || "",
                firstName: userData?.firstName || "",
                lastName: userData?.lastName || "",
                email: userData?.email || "",
                role: userData?.role || "",
                team: "",
                status: userData?.status || "",
                sendWelcomeEmail: true,
            })
        }

    }, [userData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: "role" | "team", value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            status: value === "active",
        }));
    };

    console.log(userData, "userData 1")

    const handleEdit = () => {
        console.log("Form Data:", formData);

        dispatch(UpdateUser(formData)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    toast.success("User Updated successful!");

                    console.log(res.payload)
                    closeModal();
                } else {
                }
            } else {
                console.log("Failed to fetch users:", res.payload || "Unknown error");
            }
        });


    };


    const handleAddUser = () => {
        console.log("add user")
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[800px] p-5 lg:p-10"
        >
            <div>
                <div className="flex items-center">
                    <span className="bg-amber-500 p-2 flex justify-center items-center rounded-full">
                        <Users1 />
                    </span>
                    <div className="ml-4 w-4/5">
                        <h5 className="font-semibold text-gray-800 text-title-sm dark:text-white/90">
                            Create New User/Edit User
                        </h5>
                        <span className="text-md">
                            Add a new user to the Honeybee Hive. Assign their role, team, and send a welcome email to get them started.
                        </span>
                    </div>
                </div>

                <div className="p-2">
                    <form>
                        <div className="w-full my-6">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}></span>
                        </div>

                        <div className="w-full my-6">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}></span>
                        </div>

                        <div className="w-full my-6">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}></span>
                        </div>

                        <div className="w-full my-6">
                            <Select
                                options={Role}
                                defaultValue={formData.role}
                                placeholder="User role"
                                onChange={(value: string) => handleSelectChange("role", value)}
                                className="dark:bg-dark-900"
                            />
                            <span className={REQUIRED_ERROR}></span>
                        </div>

                        <div className="w-full my-6">
                            <Select
                                options={Teams}
                                defaultValue={formData.team}
                                placeholder="Assign to team"
                                onChange={(value: string) => handleSelectChange("team", value)}
                                className="dark:bg-dark-900"
                            />
                            <span className={REQUIRED_ERROR}></span>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex flex-wrap items-center gap-8">
                                <div>Status</div>
                                <Radio
                                    id="radio1"
                                    name="status"
                                    value="active"
                                    checked={formData.status === true}
                                    onChange={() => handleStatusChange("active")}
                                    label="Active"
                                />
                                <Radio
                                    id="radio2"
                                    name="status"
                                    value="inactive"
                                    checked={formData.status === false}
                                    onChange={() => handleStatusChange("inactive")}
                                    label="Inactive"
                                />
                            </div>

                            <Checkbox
                                checked={formData.sendWelcomeEmail}
                                onChange={(val: boolean) =>
                                    setFormData((prev) => ({ ...prev, sendWelcomeEmail: val }))
                                }
                                label="Send Welcome Email"
                            />
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-end w-full gap-3 mt-8">
                    <Button size="sm" onClick={type == "add" ? handleAddUser : handleEdit}>
                        Save User
                    </Button>
                    <Button size="sm" variant="outline" onClick={closeModal}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default UserAddEditModal;
