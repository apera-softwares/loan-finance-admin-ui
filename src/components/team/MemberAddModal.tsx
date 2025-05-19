"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { Users1 } from "../../icons/index";
import { FORM_INPUT_CLASS, REQUIRED_ERROR } from "@/constant/constantClassName";

import { fetchUsers } from "@/lib/redux/slices/userManagementSlice";
import { addTeamMember } from "@/lib/redux/slices/teamManagementSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import toast from "react-hot-toast";
import { X } from "lucide-react";

interface MemberAddModalProps {
    isOpen: boolean;
    closeModal: () => void;
    id: any;
}

const MemberAddModal: React.FC<MemberAddModalProps> = ({ isOpen, closeModal, id }) => {
    const [formData, setFormData] = useState({
        name: ""
    });
    const [userData, setUserData] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (!formData.name) {
            setUserData([]);
            return;
        }

        const timeout = setTimeout(() => {
            dispatch(fetchUsers({ limit: 5, name: formData.name, role: "B_TEAM", page: 1, order: "asc" })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled" && res.payload) {
                    setUserData(res.payload.data || []);
                } else {
                    setUserData([]);
                    console.log("Failed to fetch users:", res.payload || "Unknown error");
                }
            });
        }, 300); // debounce

        return () => clearTimeout(timeout);
    }, [dispatch, formData.name]);

    const handleAddUser = () => {
        if (!selectedUser) {
            toast.error("Please select a user first.");
            return;
        }

        dispatch(addTeamMember({ teamId: id, addUserId: selectedUser.id })).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                toast.success("Team member added successfully!");
                closeModal();
                clear();
            } else {
                toast.error("Failed to add team member.");
                console.log("Error:", res.payload || "Unknown error");
            }
        });
    };

    const clear = () => {
        setFormData({ name: "" });
        setUserData([]);
        setSelectedUser(null);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                closeModal();
                clear();
            }}
            className="max-w-[800px] p-5 lg:p-10"
        >
            <div>
                <div className="flex items-center">
                    <span className="bg-amber-500 p-2 flex justify-center items-center rounded-full">
                        <Users1 />
                    </span>
                    <div className="ml-4 w-4/5">
                        <h5 className="font-semibold text-gray-800 text-title-sm dark:text-white/90">
                            Add New Member
                        </h5>
                    </div>
                </div>

                <div className="p-2">
                    <form autoComplete="off">
                        <div className="w-full my-6 relative">
                            <input
                                type="text"
                                name="name"
                                placeholder="Search member by name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}></span>

                            {/* Dropdown list */}
                            {userData.length > 0 && !selectedUser && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto">
                                    {userData.map((user) => (
                                        <li
                                            key={user.id}
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setFormData({ name: "" });
                                                setUserData([]);
                                            }}
                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            {user.firstName} {user.lastName} ({user.email})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </form>
                </div>

                {/* Selected user card */}
                {selectedUser && (
                    <div className="p-4 border rounded-md bg-gray-50 flex justify-between items-center mb-4">
                        <div>
                            <p className="font-semibold">{selectedUser.firstName} {selectedUser.lastName}</p>
                            <p className="text-sm text-gray-500">{selectedUser.email}</p>
                        </div>
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => setSelectedUser(null)}
                        >
                            <X />
                        </button>
                    </div>
                )}

                <div className="flex items-center justify-end w-full gap-3 mt-4">
                    <Button size="sm" onClick={handleAddUser}>
                        Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                        closeModal();
                        clear();
                    }}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default MemberAddModal;
