import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpForm = ({ setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShow,setConfirmShow] = useState(false);
  const[accountType,setAccount] = useState("student");
  const naviggate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password Mismatch");
      return;
    }

    setIsLoggedIn(true);
    toast.success("Acount created");
    const accountData = {
      ...formData,
    };
    const finalData = {
      ...accountData,accountType
    }
    console.log(finalData);
    naviggate("/dashboard");
  }

  return (
    <div>
      <div className="flex bg-richblack-800 p-1 gap-z-1 my-6 rounded-full max-w-max">
        <button 
        className={`${
            accountType==="student"
             ? "bg-richblack-900 text-richblack-5" 
             : "bg-transparent text-richblack-200"
           } py-2 px-5 rounded-full transition-all duration-200"`}
          onClick={() => {
            setAccount("student")
          }}
        >Student</button>
        <button
           className={`${
            accountType==="instructor"
             ? "bg-richblack-900 text-richblack-5" 
             : "bg-transparent text-richblack-200"
           } py-2 px-5 rounded-full transition-all duration-200"`}
          onClick={() => {
            setAccount("instructor")
          }}
        >Instructor</button>
      </div>


      <form onSubmit={submitHandler}>
        <div className="flex gap-x-4 mt-[20px]">
          <label htmlFor="" className="w-full ">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5  border-b-[0.235px] border-richblack-200 "
              required
              type="text"
              name="firstname"
              onChange={changeHandler}
              placeholder="Enter First Name"
              value={formData.firstname}
            />
          </label>
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5  border-b-[0.235px] border-richblack-200 "
              required
              type="text"
              name="lastname"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              value={formData.lastname}
            />
          </label>
        </div>

        <div className="mt-[20px]">
        <label htmlFor="" className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            className="bg-richblack-800 rounded-[0.75rem] text-richblack-5 w-full p-[12px] border-b-[0.235px] border-richblack-200 "
            required
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder="Enter Email"
            value={formData.email}
          />
        </label>
        </div>

        <div className="flex gap-x-4 mt-[20px]">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 border-b-[0.235px] border-richblack-200 "
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.password}
            />
            <span
            className="absolute right-3 top-[38px] cursor-pointer z-10"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> : <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
            </span>
          </label>


          <label htmlFor="" className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[0.5rem] w-full p-[12px] text-richblack-5 border-b-[0.235px] border-richblack-200 "
              required
              type={confirmShow ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
            />
            <span
            className="absolute right-3 top-[38px] cursor-pointer z-10"
              onClick={() => {
                setConfirmShow((prev) => !prev);
              }}
            >
              {confirmShow ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> : <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
            </span>
          </label>
        </div>
        <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 w-full">Create Account</button>
      </form>
    </div>
  );
};

export default SignUpForm;
