"use client";
import AuthRigthSidebar from "@/components/AuthRigthSidebar";
import { INPUT_CLASS, INPUT_REQUIRED_ERROR_CLASS } from "@/constant/constantClassName";
import Image from "next/image";
import { useState, useEffect } from "react";
import Logo from '../../../../assets/logo/logo.png'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { userSignup } from "@/lib/redux/slices/userSlice";
import Loader from "@/components/ui/loader/Loader";
import Radio from "@/components/form/input/Radio";

export default function CreateAccountPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
    })
    const router = useRouter()
    const dispatch = useAppDispatch()

    const loggedInUser = useAppSelector((state) => state.user.user);

    useEffect(() => {

        if (loggedInUser) {
            router.replace("/")
        }
    }, [loggedInUser]);

    // if (loggedInUser) return null;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFormData()) return;
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
                toast.error(res.payload || "Account Creation failed. Please try again.");
                setLoading(false)
            }
        })
    };



    const validateFormData = () => {
        let isValidData = true;
        const tempErrors = { ...errors };

        const nameRegex = /^[A-Za-z]+(-[A-Za-z]+)*$/;;
        // Validate firstName
        if (formData.firstName.trim() === "") {
            tempErrors.firstName = "First name is required";
            isValidData = false;
        } else if (!nameRegex?.test(formData.firstName)) {
            tempErrors.firstName = "Please enter valid first name";
            isValidData = false;
        } else {
            tempErrors.firstName = "";
        }

        // Validate lastName
        if (formData?.lastName.trim() === "") {
            tempErrors.lastName = "Last name is required";
            isValidData = false;
        } else if (!nameRegex?.test(formData.lastName)) {
            tempErrors.lastName = "Please enter valid last name";
            isValidData = false;
        } else {
            tempErrors.lastName = "";
        }

        // Validate email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (formData.email.trim() === "") {
            tempErrors.email = "Email is required";
            isValidData = false;
        } else if (!emailRegex?.test(formData.email)) {
            tempErrors.email = "Please enter a valid email";
            isValidData = false;
        } else {
            tempErrors.email = "";
        }

        //validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (formData.password.trim() === "") {
            tempErrors.password = "Password is required";
            isValidData = false;
        } else if (!passwordRegex.test(formData.password)) {
            tempErrors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
            isValidData = false;
        } else {
            tempErrors.password = "";
        }

        // Validate role
        if (formData.role.trim() === "") {
            tempErrors.role = "Role is required";
            isValidData = false;
        } else {
            tempErrors.role = "";
        }

        setErrors(tempErrors);
        return isValidData;

    };
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left side - Form */}
            <div className="w-full  flex flex-col justify-center items-center   py-10 ">
                <div className="absolute top-8  md:left-8  ">
                    <h1 className=" text-3xl md:text-4xl font-bold text-center md:text-start ">Lending Square</h1>
                </div>
                <div className="w-full max-w-[482px] mx-auto  mt-12 sm:mt-24 border border-gray-100 rounded-2xl px-6 py-8 shadow-lg bg-gray-100 ">
                    <h2 className="text-center  text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
                        Create an account
                    </h2>
                    <p className=" text-base  sm:text-lg md:text-start text-slate-800 mb-8">
                        
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-sm font-bold text-black mb-1">
                                First name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                className={`${INPUT_CLASS} `}
                            />
                            <span className={`${INPUT_REQUIRED_ERROR_CLASS}`}>{errors.firstName || ""}</span>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-black mb-1">
                                Last name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                className={`${INPUT_CLASS}`}
                            />
                            <span className={`${INPUT_REQUIRED_ERROR_CLASS}`} >{errors.lastName || ""}</span>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-black mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={`${INPUT_CLASS}`}
                            />
                            <span className={`${INPUT_REQUIRED_ERROR_CLASS}`} >{errors.email || ""}</span>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-black mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`${INPUT_CLASS}`}
                            />
                            <span className={`${INPUT_REQUIRED_ERROR_CLASS}`} >{errors.password || ""}</span>
                        </div>
           
                        <button
                            type="submit"
                            className="flex justify-center  items-center w-full h-14 mt-10 bg-primary hover:bg-primary-hover rounded-full shadow-lg font-bold hover:cursor-pointer transition-all duration-500"
                        >
                            {loading ? (<Loader />
                            ) : ("Create account")}
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
            {/* <div className="hidden md:block md:w-1/2 p-4">
                <AuthRigthSidebar />
            </div> */}
        </div>
    );
}
