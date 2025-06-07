"use client";
// import AuthRigthSidebar from "@/components/AuthRigthSidebar";
import { INPUT_REQUIRED_ERROR_CLASS } from "@/constant/constantClassName";
// import Image from "next/image";
import { useState, useEffect } from "react";
// import Logo from '../../../../assets/logo/logo.png'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginUser } from "@/lib/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Loader from "@/components/ui/loader/Loader";
import { getUserProfile } from "@/lib/redux/slices/loginPersonProfile";
// import Checkbox from "@/components/form/input/Checkbox";
import {
  FORM_INPUT_CLASS,
  FORM_INPUT_LABEL_CLASS,
} from "@/constant/constantClassName";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loggedInUser = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (loggedInUser) {
      router.replace("/");
    }
  }, [loggedInUser]);

  // if (loggedInUser) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFormData()) return;

    dispatch(loginUser(formData)).then((res: any) => {
      setLoading(true);
      if (res.meta.requestStatus === "fulfilled") {
        if (!res.payload) {
          toast.error("User not verified");
          setFormData({ email: "", password: "" });
          setLoading(false);
          return;
        } else {
          dispatch(getUserProfile());
          toast.success("Login successful!");
          setFormData({ email: "", password: "" });
          router.push("/");
          setLoading(false);
        }
      } else {
        toast.error(res.payload || "Login failed. Please try again.");
        setLoading(false);
      }
    });
  };

  const validateFormData = () => {
    let isValidData = true;
    const tempErrors = { ...errors };

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
    if (formData.password.trim() === "") {
      tempErrors.password = "Password is required";
      isValidData = false;
    } else {
      tempErrors.password = "";
    }

    setErrors(tempErrors);
    return isValidData;
  };

  return (
    <div className="w-full ">
      <div className="w-full  flex  justify-center items-center     py-14 lg:py-20 ">
        <div className="w-full max-w-lg mx-auto  border border-[#AEAEAE]  rounded-2xl px-6 lg:px-12 py-12 md:py-20 shadow-lg   ">
          <div className="w-full ">
            <div className="w-full mb-8 text-[#202224] ">
              <h2 className=" text-center  text-2xl md:text-3xl font-semibold  mb-4">
                Login to Account{" "}
              </h2>
              <p className="text-center  text-base md:text-lg font-medium ">
                Please enter your email and password to continue
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="w-full">
                <label className={`${FORM_INPUT_LABEL_CLASS}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`${FORM_INPUT_CLASS} bg-[#F1F4F9] `}
                />
                <span className={`${INPUT_REQUIRED_ERROR_CLASS}`}>
                  {errors.email || ""}
                </span>
              </div>

              <div className="w-full">
                <label className={`${FORM_INPUT_LABEL_CLASS}`}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`${FORM_INPUT_CLASS} bg-[#F1F4F9] `}
                />
                <span className={`${INPUT_REQUIRED_ERROR_CLASS}`}>
                  {errors.password || ""}
                </span>
              </div>
              {/* <div className="flex items-center justify-between gap-3 text-sm mt-2">
                        <label className="flex items-center space-x-2">
                        
                               <Checkbox checked={true} onChange={()=>{}} />
                            <span className="text-slate-800 font-bold">Remember Me</span>
                        </label>
                        <span
                            className="text-gray-500 underline cursor-pointer hover:text-gray-700"
                            onClick={() => router.push("/forgot-password")}
                        >
                            Forgot Password?
                        </span>
                    </div> */}

              <button
                type="submit"
                className="flex justify-center items-center  w-full h-12 md:h-14 mt-14 text-base mg:text-lg bg-primary hover:bg-primary-hover text-white font-medium rounded-lg cursor-pointer transition-all duration-500"
              >
                {loading ? <Loader /> : "Sign In"}
              </button>
            </form>

            {/* <div className="mt-6 text-center">
                    <span className="text-black text-sm font-medium">
                        Don’t have an account?                   </span>
                    <span className="text-black text-sm font-extrabold cursor-pointer" onClick={() => router.push("/signup")}>
                        Create now
                    </span>
                </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
