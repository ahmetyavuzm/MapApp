"use client"
import React from "react";
import {checkEmail} from "../services/UtilsService";
import AuthService from "../services/AuthService";
import {useNavigate} from "react-router-dom";
import { toast} from "react-toastify";


const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");

  const handleReset = async () => {
    if (!checkEmail(email)) {
      toast.error("Invalid email");
      return;
    }
    
    let res = await AuthService.resetPassword(email);
    if(res.status){
      toast.success("Password reset email sent!\nNavigating Sign In Page...", {autoClose: 1600});
      setTimeout(() => {
        navigate("../signin");
      }, 2000);
    }else{
        toast.error("Error sending email");
    }
  };

  return (
    <section className="flex  items-center justify-center w-full py-16 font-normal text-sm rounded-3xl md:rounded-[40px]  bg-white">
      <div className="flex flex-col justify-start items-center w-[336px]">
        <div className="w-full  text-black text-xl font-semibold mb-4">
          Forgot
          <br />
          Password?
        </div>
        <div className="w-full text-black text-opacity-70 font-normal mb-6">
          Enter your email for verification. We will send a 4 digits code to
          your email.
        </div>
        <div className="mb-10 w-full">
          <div className="w-full h-full">
            <label className=" opacity-75">Email Adress</label>
            <input
              value={email}
              
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              className="w-full border-black  border-[1px] rounded-xl px-4 py-4"
              type="text"
              id="email"
              name="email"
            />
          </div>
        </div>
        <div className="w-full h-14  px-3.5 py-2 bg-black rounded-xl justify-center items-center gap-1 inline-flex cursor-pointer transition duration-200 ease-in hover:shadow-2xl hover:-translate-y-[3px]">
          <div
            onClick={() => handleReset()}
            className="w-full h-full flex items-center justify-center text-center text-white text-base font-semibold "
          >
            Continue
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
