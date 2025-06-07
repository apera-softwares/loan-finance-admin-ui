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
    <div className="w-full relative overflow-hidden ">
      <div className="w-full  flex  justify-center items-center     py-14 lg:py-20 ">
        <div className="relative w-full max-w-md lg:max-w-lg mx-auto bg-white/60 md:bg-white/90  border border-[#AEAEAE]  rounded-2xl px-6 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-14 shadow-lg   ">
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

          {/* innner bubbles start */}
          <div className=" absolute left-0 sm:-left-28 bottom-2 w-20 h-20 -z-20  rotate-180 bg-blue-500 rounded-full shadow-[inset_-31px_-32px_97.5px_0px_rgba(255,255,255,0.61)]" />
          <div className="absolute -left-28 bottom-2 -z-10 w-48 h-48 rotate-180 opacity-50 bg-slate-100 rounded-full shadow-[inset_-31px_-32px_81.0999984741211px_0px_rgba(67,121,238,0.21)]" />

          <div className=" absolute top-24  -right-20 -z-20 w-44 h-44 lg:w-52 lg:h-52 transform -translate-y-4 origin-top-left rotate-[-21.66deg] bg-blue-500 rounded-full shadow-[inset_-31px_-32px_97.5px_0px_rgba(255,255,255,0.61)]" />

          <div className="absolute top-1/2 right-0 -z-10 w-60 h-60 lg:w-[400px] lg:h-[400px] transform -translate-y-1/2 translate-x-1/2 rotate-[-21.66deg] opacity-50 bg-slate-100 rounded-full shadow-[inset_-31px_-32px_81.0999984741211px_0px_rgba(67,121,238,0.21)]" />
           {/* innner bubbles start */}
        </div>
      </div>

        {/* outer bubbles start */}
      <div className="absolute top-14  w-72 h-72 -z-10 transform -translate-x-1/2 rotate-[-21.66deg] opacity-50 bg-slate-100 rounded-full shadow-[inset_-31px_-32px_81.0999984741211px_0px_rgba(67,121,238,0.21)]" />
      <div className="hidden lg:block absolute bottom-0 right-0 -z-10  w-64 h-52 transform translate-y-1/2 translate-x-20  rotate-[-21.66deg] opacity-50 bg-slate-100 rounded-full shadow-[inset_-31px_-32px_81.0999984741211px_0px_rgba(67,121,238,0.21)]" />

        {/* outer bubbles end */}

    </div>
  );
}
