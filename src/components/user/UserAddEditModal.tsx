"use client";
import React, { useEffect, useState,useRef } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { Users1 } from "../../icons/index";
import {  REQUIRED_ERROR } from "@/constant/constantClassName";
import Select from "../form/Select";
import { CreateUser, UpdateUser } from "@/lib/redux/slices/userManagementSlice";
import { useAppDispatch,useAppSelector } from "@/lib/redux/hooks";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_API } from "@/api";
import { Roles } from "@/constant/roles";


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


const FORM_INPUT_CLASS = "w-full h-10 text-base bg-white border-b border-gray-200 focus:border-gray-300  text-gray-600 outline-none   transition-all duration-500 " ;
const FORM_INPUT_LABEL = " block w-full  text-sm font-medium text-gray-600";


const UserAddEditModal: React.FC<UserAddEditModalProps> = ({ isOpen, closeModal, userData, type }) => {

    const dispatch = useAppDispatch();
    const loggedInUser = useAppSelector((state)=>state.user.user);
    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone:"",
        password:"",
        status:"",
        availableCredit:"",
        interestRate:"",
        bankAccountNumber:"",
        routingNumber:"",
        salesRepUserId:"",
        utilizedCredit:"",
    });

    const [errors, setErrors] = useState({
       id: "",
        firstName: '',
        lastName: "",
        email: "",
        phone:"",
        password:"",
        status:"",
        availableCredit:"",
        interestRate:"",
        bankAccountNumber:"",
        routingNumber:"",
        salesRepUserId:"",
        utilizedCredit:"",
    })
    const [salesRepList,setSalesRepList] = useState<any[]>([]);
    const [salesRepName,setSalesRepName]=useState<string>("");
    const[selectedSalesRep,setSelectedSalesRep]= useState<any>(null);
    const[showSalesRepDropdown,setShowSalesRepDropdown] = useState<boolean>(false)
    const salesRepDropdownRef = useRef<HTMLDivElement | null>(null);
    const isEditMode = type==="update" ? true : false ; 

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (userData) {
            setFormData({
            id: userData?.id,
            firstName: userData?.firstName||"",
            lastName: userData?.lastName||"",
            email: userData?.email||"",
            phone:userData?.phone||"",
            password:userData?.password||"",
            status:userData?.UserDetails?.[0]?.status||"",
            availableCredit:userData?.UserDetails?.[0]?.availableCredit?.toString()||"",
            interestRate:userData?.UserDetails?.[0]?.interestRate?.toString()||"",
            bankAccountNumber:userData?.UserDetails?.[0]?.bankAccountNumber||"",
            routingNumber:userData?.UserDetails?.[0]?.routingNumber||"",
            salesRepUserId:userData?.UserDetails?.[0]?.salesRepUserId||undefined,
            utilizedCredit:userData?.UserDetails?.[0]?.utilizedCredit?.toString()||"",
            });
            if(userData?.UserDetails?.[0]?.salesRep)
            {
              setSelectedSalesRep(userData?.UserDetails?.[0]?.salesRep);
            }
        }
    }, [userData]);
   
    useEffect(() => {

    const timeoutId = setTimeout(() => {
      fetchSalesRep();
    }, 200); 

    return () => clearTimeout(timeoutId);
    }, [salesRepName]);





    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


  const handleOpenSalesRepDropdown = () => {
    setShowSalesRepDropdown(true);
  };

    const handleSelectSalesRep = (value: any) => {

    if (value) {
      setSelectedSalesRep(value);
      setShowSalesRepDropdown(false);
      setFormData((prev) => ({
        ...prev,
        salesRepUserId:value?.id
      }));
      setSalesRepList([]);
      setSalesRepName("");
      return;
    }
    setSelectedSalesRep(undefined);
    setFormData((prev) => ({
      ...prev,
      salesRepUserId:"",
    }));


  };

    const handleClickOutside = (e: MouseEvent) => {
    if (salesRepDropdownRef.current && !salesRepDropdownRef.current.contains(e.target as Node)) {
      setShowSalesRepDropdown(false);
      setSalesRepName("");
      setSalesRepList([])
    }
  };


      const fetchSalesRep = async () => {

    if (salesRepName.trim()==="") {
      setSalesRepList([]);
      return;
    }
  
    try {
      const token = loggedInUser?.token;
      const response = await axios.get(`${BACKEND_API}sales-reps?page=1&limit=20&name=${salesRepName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      setSalesRepList(response?.data?.data||[]);

    } catch (error: any) {
      console.log("error while fetching sales reps", error)

    } 
  };
    const handleEdit = () => {

        const payload={

            id:formData.id,
            firstName:formData.firstName,
            lastName:formData.lastName,
            email:formData.email,
            phone:formData.phone,
            availableCredit: parseFloat(formData.availableCredit)||undefined,
            interestRate: parseFloat(formData.interestRate)||undefined,
            salesRepUserId:formData.salesRepUserId||userData?.UserDetails?.[0]?.salesRepUserId||undefined,
            status:formData.status,
            role:Roles.USER
        }
        
        console.log("user edit payload",payload);

        dispatch(UpdateUser(payload)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    toast.success("User Updated successfully");

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
        const payload={
            firstName:formData.firstName,
            lastName:formData.lastName,
            email:formData.email,
            phone:formData.phone,
            password:formData.password,
            availableCredit: parseFloat(formData.availableCredit)||undefined,
            interestRate: parseFloat(formData.interestRate)||undefined,
            salesRepUserId:formData.salesRepUserId||undefined,
            role:Roles.USER
        }
        
        console.log("user create payload",payload);

        dispatch(CreateUser(payload)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (res.payload) {
                    toast.success("User Created successfully");
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
            availableCredit:"",
            interestRate:"",
            bankAccountNumber:"",
            routingNumber:"",
            salesRepUserId:"",
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
            availableCredit:"",
            interestRate:"",
            bankAccountNumber:"",
            routingNumber:"",
            salesRepUserId:"",
            utilizedCredit:"",
            });
            setSelectedSalesRep(undefined);
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
                                <label className={FORM_INPUT_LABEL}>
                                 First Name
                                </label>
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
                                 <label className={FORM_INPUT_LABEL}>
                                 Last Name
                                </label>
                                <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.lastName || ""}</span>
                             </div>
                            <div className="w-full">
                                 <label className={FORM_INPUT_LABEL}>
                                 Email
                                </label>
                                <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.email || ""}</span>
                            </div>
                            <div className="w-full">
                                 <label className={FORM_INPUT_LABEL}>
                                 Phone
                                </label>
                                <input
                                type="text"
                                name="phone"
                                className={FORM_INPUT_CLASS}
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
                                type==="add" && ( <div className="w-full">
                                <label className={FORM_INPUT_LABEL}>
                                 Password
                                </label>
                                <input
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                                 />
                                 <span className={REQUIRED_ERROR}>{errors.password|| ""}</span>
                                 </div>
)
                             }

                             <div className="w-full">
                                 <label className={FORM_INPUT_LABEL}>
                                 Available Credit
                                </label>
                            <input
                                type="text"
                                name="availableFunding"
                                value={formData.availableCredit}
                                onChange={(e) => {
                                const value = e.target.value;
                                 // Allow only digits (optionally, you can add `.` if you want decimals)
                                if (/^\d*$/.test(value)) {
                                    setFormData((prev) => ({
                                                           ...prev,
                                                           availableCredit: value,
                                                           }));
                                }
                                }}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.availableCredit|| ""}</span>
                             </div>
                                <div className="w-full ">
                                <label className={FORM_INPUT_LABEL}>
                                 Interest Rate (%)
                                </label>
                               <input
                                type="text"
                                name="interestRate"
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

                <div className="relative w-full" ref={salesRepDropdownRef}>
                     <label className={FORM_INPUT_LABEL}>
                                 Assigned Sales Rep
                                </label>
              <input
                type="text"
                readOnly
                value={
                  selectedSalesRep
                  ? `${selectedSalesRep?.firstName||""} ${selectedSalesRep?.lastName||""}`   
                    : ""
                }
                onClick={handleOpenSalesRepDropdown}
                placeholder=""
                className={`${FORM_INPUT_CLASS} cursor-pointer`}
              />
              <span className={`${REQUIRED_ERROR}`}>{""}</span>

              {showSalesRepDropdown && (
                <div className="absolute z-50 top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 px-2 py-2">
                  {selectedSalesRep && (
                    <div className="mb-2 flex items-center justify-between gap-2 px-3 py-1 bg-gray-100 rounded">
                      <span className="text-sm text-gray-800">
                        {`${selectedSalesRep?.firstName||""} ${selectedSalesRep?.lastName||""}`
                        }
                      </span>
                      <button
                        onClick={() => handleSelectSalesRep(null)}
                        className="ml-2 text-gray-500 hover:text-red-500 transition-all duration-300 "
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Search "
                    value={salesRepName}
                    onChange={(e) => setSalesRepName(e.target.value)}
                    className="w-full px-3 py-2 rounded-md outline-none border border-gray-200 mb-1 "
                    autoFocus
                  />
                  <ul className="max-h-48 overflow-y-auto">
                    {salesRepList.length > 0 ? (
                      salesRepList.map((salesRepUser) => (
                        <li
                          key={salesRepUser.id}
                          onClick={() => handleSelectSalesRep(salesRepUser)}
                          className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                        >
                          {`${salesRepUser?.firstName||""} ${salesRepUser?.firstName||""}`}
                        </li>
                      ))
                    ) : (
                      <li className=" px-3 py-1 text-gray-400">{salesRepName.trim().length > 0 && salesRepList.length === 0 ? "No result found" : ""}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

                            {
                                type==="update" && <>

                                
                            <div className="w-full">
                            <label className={FORM_INPUT_LABEL}>
                                 Status 
                            </label>
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
                                <label className={FORM_INPUT_LABEL}>
                                 Utilized Credit
                                </label>
                                 <input
                                type="text"
                                name="utilizedCredit"
                                value={formData.utilizedCredit}
                                readOnly={isEditMode}
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

                            <div className="w-full">
                                <label className={FORM_INPUT_LABEL}>
                                 Bank Account Number
                                </label>
                                <input
                                type="text"
                                name="bankAccountNumber"
                                readOnly={isEditMode}
                                value={formData.bankAccountNumber}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.bankAccountNumber|| ""}</span>
                           </div>
                            <div className="w-full">

                                 <label className={FORM_INPUT_LABEL}>
                                 Routing Number
                                </label>
                                <input
                                type="text"
                                name="routingNumber"
                                readOnly={isEditMode}
                                value={formData.routingNumber}
                                onChange={handleInputChange}
                                className={FORM_INPUT_CLASS}
                            />
                            <span className={REQUIRED_ERROR}>{errors.routingNumber|| ""}</span>
                            </div>
                                
                                </>
                            }

                     


                        </div>
                    </div>
                    <div className="flex items-center justify-end w-full gap-3 mt-8">
                    <Button size="sm" className="btn-primary" onClick={type==="add" ? handleAddUser:handleEdit}>
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

             

            </div>
        </Modal>
    );
};

export default UserAddEditModal;
