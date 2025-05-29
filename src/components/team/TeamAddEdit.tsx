"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { Users1 } from "../../icons/index";
import { FORM_INPUT_CLASS, REQUIRED_ERROR } from "@/constant/constantClassName";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import toast from "react-hot-toast";
import { CreateTeam, fetchTeams, UpdateTeam } from "@/lib/redux/slices/teamManagementSlice";

interface TeamAddEditProps {
    isOpen: boolean;
    closeModal: () => void;
    teamData?: any
    type?: string
}

const TeamAddEdit: React.FC<TeamAddEditProps> = ({ isOpen, closeModal, teamData, type }) => {
    const [formData, setFormData] = useState({
        id: "",
        name: ""
    });
    const [errors, setErrors] = useState({
        name: "",
    })

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (teamData) {
            setFormData({
                id: teamData?.id || "",
                name: teamData?.name || "",
            });
        }
    }, [teamData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateFormData = () => {
        let isValidData = true;
        const tempErrors = { ...errors };

        // Validate firstName
        if (formData.name.trim() === "") {
            tempErrors.name = "Team name is required";
            isValidData = false;
        } else {
            tempErrors.name = "";
        }


        setErrors(tempErrors);
        return isValidData;

    };


    console.log(teamData, "Team Data 1")

    const handleEdit = () => {
        console.log("Form Data: Update User", formData);
        if (!validateFormData()) return
        dispatch(UpdateTeam(formData)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    toast.success("Team Updated successful!");
                    dispatch(fetchTeams({ page: 1, limit: 5 }))
                    console.log(res.payload)
                    closeModal();
                    clear()
                } else {
                }
            } else {
                console.log("Failed to Update Team:", res.payload || "Unknown error");
                toast.error("Failed to Update Team");
            }
        });
    };

    const handleAddUser = () => {
        console.log("Form Data: Add Team", formData);
        if (!validateFormData()) return
        dispatch(CreateTeam(formData)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    toast.success("Team Created successful!");
                    console.log("Team Created successful!");

                    console.log(res.payload)
                    closeModal();
                    clear()
                } else {
                }
            } else {
                console.log("Failed to Create Team:", res.payload || "Unknown error");
                toast.error("Failed to Create Team");
            }
        });
    }

    const clear = () => {
        setFormData({
            id: "",
            name: "",
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                closeModal()
                clear()
            }}
            className="max-w-[800px] p-6 lg:p-10 pt-10 "
        >
            {/* <Toaster /> */}

            <div className="w-full ">
                <div className="flex items-center">
                    <span className="bg-primary p-1 sm:p-2 flex justify-center items-center rounded-full">
                        <Users1 />
                    </span>
                    <div className="ml-4 w-4/5">
                        <h5 className="font-semibold text-gray-800 text-xl sm:text-2xl lg:text-3xl dark:text-white/90">
                            {type == "add" ? "Create New Team" : "Edit Team Name"}
                        </h5>
                        {/* <span className="text-md">
                            Add a new Team to the Honeybee Hive. add Members, team.
                        </span> */}
                    </div>
                </div>

                <div className="p-2">
                    <form>
                        <div className="w-full my-6">
                            <input
                                type="text"
                                name="name"
                                placeholder="Team name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                                required
                            />
                            <span className={REQUIRED_ERROR}>{errors.name}</span>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-end w-full gap-3 mt-4">
                    <Button size="sm" onClick={type == "add" ? handleAddUser : handleEdit}>
                        Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                        closeModal()
                        clear()
                    }}>
                        Cancel
                    </Button>
                </div>

            </div>
        </Modal>
    );
};

export default TeamAddEdit;

