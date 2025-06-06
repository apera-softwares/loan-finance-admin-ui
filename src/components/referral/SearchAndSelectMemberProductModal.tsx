"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { Users1 } from "../../icons/index";
import { FORM_INPUT_CLASS } from "@/constant/constantClassName";
import { useAppDispatch,useAppSelector } from "@/lib/redux/hooks";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { BACKEND_API } from "@/api";


interface SearchAndSelectMemberProductModalProps {
    isOpen: boolean;
    closeModal: () => void;
    memberId:string;
    selectedProduct:any|null;
    onProductSelect:(member:any)=>void;
}

const SearchAndSelectMemberProductModal: React.FC<SearchAndSelectMemberProductModalProps> = ({ isOpen, closeModal,memberId,selectedProduct,onProductSelect }) => {
    const[productName,setProductName] = useState<string>("");
    const [memberProductsList, setMemberProductsList] = useState<any[]>([]);
    const  loggedInUser = useAppSelector((state)=>state.user.user);
     const dispatch = useAppDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setProductName(e.target.value);

    };

    useEffect(() => {
     
        const timeoutId = setTimeout(() => {


            fetchMembers();

       
        }, 300); // debounce

        return () => clearTimeout(timeoutId);
    }, [dispatch, productName]);


const fetchMembers = async () => {
  if (!productName.trim()) {
      setMemberProductsList([]);
      return;
  }

  const token = loggedInUser?.token;

       

  try {
        const response = await axios.get(`${BACKEND_API}product/${memberId}?name=${productName.trim()}&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}`, 
                     'ngrok-skip-browser-warning': 'true', },
        }
        );
        setMemberProductsList(response?.data?.data||[]);

        } catch (error: any) {
        console.log("error while fetching member products", error)

        } finally {

        }
      };



    const clear = () => {
        setProductName("");
        setMemberProductsList([]);
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
                            Select Member Product
                        </h5>
                    </div>
                </div>

                <div className="">
                        <div className="w-full my-6 relative">
                            <input
                                type="text"
                                name="name"
                                placeholder="Search member product by name"
                                value={productName}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className="text-[#717171]">
                                {productName.trim().length > 0 && memberProductsList.length === 0 ? "No result found" : ""}
                            </span>

                            {/* Dropdown list */}
                            {memberProductsList.length > 0 && !selectedProduct && (
                                <ul className=" w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto">
                                    {memberProductsList.map((memberProduct) => (
                                        <li
                                            key={memberProduct.id}
                                            onClick={() => {

                                                onProductSelect(memberProduct);
                                                setProductName("");
                                                setMemberProductsList([]);
                                                closeModal();
                                              
                                            }}
                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            {
                                                `${memberProduct?.name||""} `
                                            }
                                            
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                </div>
                {/* Selected user card */}
                {selectedProduct && (
                    <div className="px-4 py-2 border rounded-md bg-gray-50 flex justify-between gap-2 items-center mb-4">
                        <div>
                            <p className="font-medium">{selectedProduct?.name} </p>
                        </div>
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => onProductSelect(null)}
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

export default SearchAndSelectMemberProductModal;
