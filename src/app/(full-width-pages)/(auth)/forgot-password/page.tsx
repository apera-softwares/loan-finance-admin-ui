"use client";
import AuthRigthSidebar from "@/components/AuthRigthSidebar";
import { INPUT_CLASS,INPUT_REQUIRED_ERROR_CLASS } from "@/constant/constantClassName";
import Image from "next/image";
import { useState } from "react";
import Logo from '../../../../assets/logo/logo.png'
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
// import Loader from "@/components/ui/loader/Loader";

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: "",
    });
    const [errors, setErrors] = useState({
        email: "",
     
    });
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!validateFormData()) return;
        console.log("Account data:", formData);
        
    };

        const validateFormData = () => {

    let isValidData = true;
    const tempErrors = { ...errors };

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email.trim() === "") {
      tempErrors.email= "Email is required";
      isValidData = false;
    } else if (!emailRegex?.test(formData.email)) {
      tempErrors.email = "Please enter a valid email";
      isValidData = false;
    } else {
      tempErrors.email = "";
    }



    setErrors(tempErrors);
    return isValidData;
    
  };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left side - Form */}

            <div className="w-full md:w-1/2 flex flex-col justify-center items-center   px-3 sm:px-6  py-10">
                <div className="absolute top-8 left-1/2 md:left-8 transform -translate-x-1/2 md:translate-x-0 ">
                    <Image src={Logo} alt="Logo" width={230} height={60} />
                </div>
         <div className="w-full max-w-[482px] mx-auto  mt-12 sm:mt-24">
                   <h2 className="text-center md:text-start text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                    Forgot password?</h2>
                <p className="text-center md:text-start text-base sm:text-lg text-slate-800 mb-8">
                    Enter the email associated with your Honeybee Harry{"'"}s club account, and we’ll send you a password reset link.                </p>
                <form onSubmit={handleSubmit} className="space-y-6">


                    <div>
                        <label className="block text-sm font-bold text-black mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Your Email"
                            className={`${INPUT_CLASS}`}
                        />
                        <span className={`${INPUT_REQUIRED_ERROR_CLASS}`}>{errors.email||""}</span>
                    </div>


                    <button
                        type="submit"
                        className="flex justify-center items-center w-full h-14 text-white bg-gradient-to-b from-orange-500 to-amber-400 rounded-full shadow-lg font-bold hover:cursor-pointer"
                    >

                           {/* {loading ? (<Loader/>):("Reset password")} */}
                           Reset password
                     
                    </button>
                </form>

                <div className="mt-6 text-center flex justify-center items-center cursor-pointer" onClick={()=>router.push("/signin")}>
                    <IoArrowBackOutline />
                    <span className="text-black text-sm font-medium ml-2"> Back to log in </span>
                </div>
         </div>
            </div>

            {/* Right side - Hidden on small screens */}
            <div className="hidden md:block md:w-1/2 p-4">
                <AuthRigthSidebar />
            </div>
        </div>
    );
}
