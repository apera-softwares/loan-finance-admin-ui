"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { Users1 } from "../../icons/index";
import { FORM_INPUT_CLASS, REQUIRED_ERROR } from "@/constant/constantClassName";
import { fetchUsers } from "@/lib/redux/slices/userManagementSlice";
import { addTeamMember, fetchTeamMembers } from "@/lib/redux/slices/teamManagementSlice";
import { useAppDispatch,useAppSelector } from "@/lib/redux/hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { BACKEND_API } from "@/api";


interface SearchAndSelectPreferredSalesPersonModalProps {
    isOpen: boolean;
    closeModal: () => void;
    selectedPreferredSalesPerson:(any|null);
    onPreferredSalesPersonSelect:(person:any)=>void;
}

const SearchAndSelectPreferredSalesModal: React.FC<SearchAndSelectPreferredSalesPersonModalProps> = ({ isOpen, closeModal,selectedPreferredSalesPerson,onPreferredSalesPersonSelect }) => {
    const[personName,setPersonName] = useState<string>("");
    const[loading,setLoading] = useState<boolean>(false);
    const [preferredSalesPersonList, setPreferredSalesPersonList] = useState<any[]>([]);
   
    const  loggedInUser = useAppSelector((state)=>state.user.user);
     const dispatch = useAppDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setPersonName(e.target.value);

    };

    useEffect(() => {
     
        const timeoutId = setTimeout(() => {


            fetchPreferredSalesPerson();

       
        }, 300); // debounce

        return () => clearTimeout(timeoutId);
    }, [dispatch, personName]);


const fetchPreferredSalesPerson = async () => {
  if (!personName.trim()) {
      setPreferredSalesPersonList([]);
      return;
  }

  const token = loggedInUser?.token;

       

  try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_API}admin/users?name=${personName.trim()}`,
        {
          headers: { Authorization: `Bearer ${token}`, 
                     'ngrok-skip-browser-warning': 'true', },
        }
        );
        console.log(" preferred sales person  response",response);
        setPreferredSalesPersonList(response?.data?.data||[]);

        } catch (err: any) {

      
        } finally {

          setLoading(false);

        }
      };



    const clear = () => {
        setPersonName("");
        setPreferredSalesPersonList([]);

    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                closeModal();
                clear();
            }}
            className="max-w-[800px] p-5 lg:p-10">
            <div>
                <div className="flex items-center">
                    <span className="bg-primary p-2 flex justify-center items-center rounded-full">
                        <Users1 />
                    </span>
                    <div className="ml-4 w-4/5">
                        <h5 className="font-semibold text-gray-800 text-title-sm dark:text-white/90">
                            Select Preferrred Salesperson
                        </h5>
                    </div>
                </div>

                <div className="">
                        <div className="w-full my-6 relative">
                            <input
                                type="text"
                                name="name"
                                placeholder="Search preferred salesperson by name"
                                value={personName}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}></span>

                            {/* Dropdown list */}
                            {preferredSalesPersonList.length > 0 && !selectedPreferredSalesPerson && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto">
                                    {preferredSalesPersonList.map((person) => (
                                        <li
                                            key={person.id}
                                            onClick={() => {

                                                onPreferredSalesPersonSelect(person);
                                                setPersonName("");
                                                setPreferredSalesPersonList([]);
                                                closeModal();
                                              
                                            }}
                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            {
                                                `${person?.firstName||""} ${person?.lastName||""} `
                                            }
                                            
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                </div>
                {/* Selected user card */}
                {selectedPreferredSalesPerson && (
                    <div className="px-4 py-2 border rounded-md bg-gray-50 flex justify-between gap-2 items-center mb-4">
                        <div>
                            <p className="font-medium"> {
                                                `${selectedPreferredSalesPerson?.firstName||""} ${selectedPreferredSalesPerson?.lastName||""} `
                                            }
                                             </p>
                        </div>
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => onPreferredSalesPersonSelect(null)}
                        >
                            <RxCross2 className="h-6 w-6" />

                        </button>
                    </div>
                )}
                <div className="flex items-center justify-end w-full gap-3 mt-4">
                   
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

export default SearchAndSelectPreferredSalesModal;
