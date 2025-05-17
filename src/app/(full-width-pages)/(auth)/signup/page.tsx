"use client";
import AuthRigthSidebar from "@/components/AuthRigthSidebar";
import { INPUT_CLASS } from "@/constant/constantClassName";
import Image from "next/image";
import { useState } from "react";
import Logo from '../../../../assets/logo/logo.png'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/redux/hooks";
import { userSignup } from "@/lib/redux/slices/userSlice";

export default function CreateAccountPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        dispatch(userSignup(formData)).then((res: any) => {
            if (res.meta.requestStatus === "fulfilled") {
                toast.success("Account Creation successful!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    role: ""
                });
                router.push("/signin");
                setLoading(false)
            } else {
                toast.error(res.payload || "Login failed. Please try again.");
                setLoading(false)
            }
        })
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center   px-3 sm:px-6  py-10 border">
                <div className="absolute top-8 left-1/2 md:left-8 transform -translate-x-1/2 md:translate-x-0 ">
                    <Image src={Logo} alt="Logo" width={230} height={60} />
                </div>
            <div className="w-full max-w-md mx-auto border mt-12 sm:mt-20 ">
                    <h2 className="text-center md:text-start text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
                    Create an account
                </h2>
                <p className=" text-lg md:text-start text-slate-800 mb-8">
                    Your account will be activated by an Admin. Fill out the info below to
                    request access to Honeybee Harry.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-xs font-bold text-black mb-1">
                            First name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Catherine Chen"
                            className={`${INPUT_CLASS} focus:outline-[#FFA819]`}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-black mb-1">
                            Last name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Catherine Chen"
                            className={`${INPUT_CLASS} focus:outline-[#FFA819]`}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-black mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Catherine.chen@honeybeen.com"
                            className={`${INPUT_CLASS} focus:outline-[#FFA819]`}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-black mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Type your password"
                            className={`${INPUT_CLASS} focus:outline-[#FFA819]`}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-black mb-2">
                            Select role ?
                        </label>
                        <div className="flex items-center space-x-6">
                            <label className="inline-flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="A_TEAM"
                                    checked={formData.role === "A_TEAM"}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                />
                                <span className="text-sm text-gray-700">A team</span>
                            </label>
                            <label className="inline-flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="B_TEAM"
                                    checked={formData.role === "B_TEAM"}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                />
                                <span className="text-sm text-gray-700">B team</span>
                            </label>
                        </div>
                    </div>



                    <button
                        type="submit"
                        className="w-full h-14 text-white bg-gradient-to-b from-orange-500 to-amber-400 rounded-full shadow-lg font-bold hover:cursor-pointer"
                    >
                        Create account
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <span className="text-black text-sm font-medium">
                        Already have an account?{" "}
                    </span>
                    <span className="text-black text-sm font-extrabold cursor-pointer" onClick={() => router.push("/signin")}>
                        Log in
                    </span>
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
