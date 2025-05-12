"use client";
import AuthRigthSidebar from "@/components/AuthRigthSidebar";
import { INPUT_CLASS } from "@/constant/constantClassName";
import Image from "next/image";
import { useState } from "react";
import Logo from '../../../../assets/logo/logo.png'
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: "",
    });

    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Account data:", formData);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left side - Form */}

            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-24 2xl:px-60 py-10">
                <div className="hidden md:block absolute top-6 left-6">
                    <Image src={Logo} alt="Logo" width={230} height={60} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                    Forgot password?</h2>
                <p className="text-lg text-slate-800 mb-8">
                    Enter the email associated with your Honeybee Harry{"'"}s club account, and we’ll send you a password reset link.                </p>
                <form onSubmit={handleSubmit} className="space-y-6">


                    <div>
                        <label className="block text-xs font-bold text-black mb-1">
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
                    </div>


                    <button
                        type="submit"
                        className="w-full h-14 text-white bg-gradient-to-b from-orange-500 to-amber-400 rounded-full shadow-lg font-bold hover:cursor-pointer"
                    >
                        Reset password
                    </button>
                </form>

                <div className="mt-6 text-center flex justify-center items-center cursor-pointer" onClick={()=>router.push("/signin")}>
                    <IoArrowBackOutline />
                    <span className="text-black text-sm font-medium ml-2"> Back to log in </span>
                </div>
            </div>

            {/* Right side - Hidden on small screens */}
            <div className="hidden md:block md:w-1/2 p-4">
                <AuthRigthSidebar />
            </div>
        </div>
    );
}
