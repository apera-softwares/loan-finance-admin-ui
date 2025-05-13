"use client";
import AuthRigthSidebar from "@/components/AuthRigthSidebar";
import { INPUT_CLASS } from "@/constant/constantClassName";
import Image from "next/image";
import { useState } from "react";
import Logo from '../../../../assets/logo/logo.png'
import { useRouter } from "next/navigation";
import { BACKEND_API } from "@/api";
import toast from "react-hot-toast";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Account data:", formData);
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${BACKEND_API}auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("Signup response:", data);

            if (res.ok) {
                toast.success('Success Login!')

                setTimeout(() => {
                    router.push("/");
                }, 1000);



            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left side - Form */}

            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-24 2xl:px-60 py-10">
                <div className="hidden md:block absolute top-6 left-6">
                    <Image src={Logo} alt="Logo" width={230} height={60} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                    Login                </h2>
                <p className="text-lg text-slate-800 mb-8">
                    Log in to track your referrals, check commissions, and grow your hive — one buzz at a time.
                </p>
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
                    <div className="flex items-center justify-between text-sm mt-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded bg-yellow-400 border-yellow-400 focus:ring-yellow-400 text-yellow-500"
                            />
                            <span className="text-slate-800 font-bold">Remember Me</span>
                        </label>
                        <span
                            className="text-gray-500 underline cursor-pointer hover:text-gray-700"
                            onClick={() => router.push("/forgot-password")}
                        >
                            Forgot Password?
                        </span>
                    </div>


                    <button
                        type="submit"
                        className="w-full h-14 text-white bg-gradient-to-b from-orange-500 to-amber-400 rounded-full shadow-lg font-bold hover:cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <span className="text-black text-sm font-medium">
                        Don’t have an account?                   </span>
                    <span className="text-black text-sm font-extrabold cursor-pointer" onClick={() => router.push("/signup")}>
                        Create now
                    </span>
                </div>
            </div>

            {/* Right side - Hidden on small screens */}
            <div className="hidden md:block md:w-1/2 p-4">
                <AuthRigthSidebar />
            </div>
        </div>
    );
}
