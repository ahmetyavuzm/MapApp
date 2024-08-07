import AuthService from "../services/AuthService";
import React from "react";


import {Link, useNavigate} from "react-router-dom"; 

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkEmail } from "../services/UtilsService";

import { useAuthContext } from "../contexts/AuthContext";

const SignUpPage = () => {

    const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isAgree, setIsAgree] = React.useState(false);

  const [focus, setFocus] = React.useState(null);
  const [focuses, setFocuses] = React.useState([null, null, null, null, null]);
  const[validities, setValidities] = React.useState([false, false, false, false,false]);



  const handleRoute = async (res) =>{
    if(!res.status){
        
        if (res.error.code === AuthService.ERROR_ALREADY_IN_USE_CODE){
            toast.error("User Already Exist!");
            setTimeout(() => {
                navigate("/signIn")
            }, 2000);
            
        }else{
            toast.error("An error occured! Please try again later!");
        }
      return;
    }
    navigate("/mapApp/"+AuthService.auth.currentUser.uid);
  }

  const handleSignUpGoogle = async () => {
    let res = await AuthService.signUpWithGoogle();
    handleRoute(res);
  };

  const handleSignUpEmailAndPassword = async () => {
    if (password !== confirmPassword){
        toast.error("Password does not match!")
        return;
    }
    if (!isAgree){
    
        toast.error("You did not agree to the terms of service!")
        return;
    }

    let res = await AuthService.signUpWithEmailAndPassword(name, email, password);
    handleRoute(res);
  }

  const handleSubmit= () => {
    setFocuses([false, false, false, false]);
    setFocus(null);
    if (validities.includes(false)){
        toast.error("Please fill all the fields!", {});
    }else{
      handleSignUpEmailAndPassword();
    }

  };


  React.useEffect(() => {
    setValidities([name.length > 0, checkEmail(email), password.length > 0, confirmPassword.length > 0, isAgree]);
  }, [name, email, password, confirmPassword, isAgree]);


  React.useEffect(() => {
    let temp = [...focuses];
    for (let i = 0; i < temp.length; i++) {
      if (i != focus && temp[i] == true) {
        temp[i] = false;
      }
    }
    
    temp[focus] = true;
    setFocuses(temp);
    
  }, [focus]);


  return (
    <section className="flex items-center justify-center w-full py-16 px-2 md:px-0 font-normal text-black  text-center rounded-3xl md:rounded-[40px]  bg-white">
      <ToastContainer />
      <div className="flex  w-[336px] flex-col items-center justify-center ">
        <div
          title="text"
          className="flex flex-col items-center justify-center my-3"
        >
          <p className="text-xl  font-semibold m-1">Create an Account</p>
          <p className="text-sm  mb-3">
          Sign up now to get started with an account.
          </p>
        </div>
        <div title="login-goggle" className="w-full my-3 cursor-pointer">
          <div
            onClick={() => {
              handleSignUpGoogle();
            }}
            className="w-full flex items-center justify-around px-10 py-4  border-[1px] border-black rounded-xl transition-colors ease-in duration-200 hover:bg-black hover:text-white"
          >
            <img src={"/images/googleIcon.png"} alt="google_icon_l" width={250} height={250} className="text-red-500 w-4 h-4 " />
            <p className="font-semibold ">Sign up with Google</p>
          </div>
        </div>
        <div className="w-full h-auto flex items-center justify-center px-3 font-light">
          <div className="w-full h-[1px] bg-black opacity-25"></div>
          <p className="mx-4 opacity-25 ">OR</p>
          <div className="w-full h-[1px] bg-black opacity-25"></div>
        </div>
        <form className=" w-full text-sm text-start">
          <div className="my-4 w-full">
            <div className="w-full h-full group">
              <label className={`${ (focuses[0] || validities[0] || focuses[0] == null) ? "text-black" :" text-red-500" } opacity-75`}  >Full Name</label>
              <input
                value={name}
                onFocus={() =>setFocus(0)}
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                className={`${ (focuses[0] || validities[0] || focuses[0] == null) ? "text-black border-black outline-black" :" text-red-500 border-red-500 shadow-red-500 shadow-sm" } w-full border-[1px] rounded-xl px-4 py-4 `}
                
                type="text"
                id="name"
                name="name"
              />
            </div>
          </div>
          <div className="my-4 w-full">
            <div className="w-full h-full">
              <label className={`${ (focuses[1] || validities[1] || focuses[1]== null) ? "text-black" :" text-red-500" } opacity-75`}>Email Adress</label>
              <input
                value={email}
                onFocus={() => setFocus(1)}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                className={`${ (focuses[1] || validities[1]||  focuses[1]== null) ? "text-black border-black outline-black" :" text-red-500 border-red-500 shadow-red-500 shadow-sm" } w-full border-[1px] rounded-xl px-4 py-4 `}
                type="text"
                id="email"
                name="email"
              />
            </div>
          </div>
          
          <div className="my-4 w-full">
            <div className=" w-full h-full ">
              <label className={`${ (focuses[2] || validities[2]|| focuses[2]== null) ? "text-black" :" text-red-500" } opacity-75`}>Password</label>
              <div className="w-full flex items-center relative">
                <img
                priority={true}
                  src={isShowPassword ? "/images/unEyeIcon.png" : "/images/eyeIcon.png"}
                  alt="showPassword"
                  onClick={() => {
                    setIsShowPassword(!isShowPassword);
                  }}
                  width={24}
                  height={24}
                  className="absolute right-5 cursor-pointer w-5 h-auto"
                />
                <input
                  value={password}
                  onFocus={() => setFocus(2)}
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                  className={`${ (focuses[2] || validities[2]|| focuses[2]== null) ? "text-black border-black outline-black" :" text-red-500 border-red-500 shadow-red-500 shadow-sm" } w-full border-[1px] rounded-xl px-4 py-4`}
                  type={isShowPassword ? "text" : "password"}
                  id="password"
                  name="password"
                />
              </div>
            </div>
          </div>
          <div className="my-4 w-full">
            <div className=" w-full h-full">
              <label className={`${ (focuses[3] || validities[3] || focuses[3]== null) ? "text-black" :" text-red-500" } opacity-75`}>Confirm Password</label>
              <div className="w-full flex items-center relative">
                <input
                  value={confirmPassword}
                  onFocus={() => setFocus(3)}
                  onChange={(e) => {
                    e.preventDefault();
                    setConfirmPassword(e.target.value);
                  }}
                  className={`${ (focuses[3] || validities[3]|| focuses[3]== null) ? "text-black border-black outline-black" :" text-red-500 border-red-500 shadow-red-500 shadow-sm" } w-full border-[1px] rounded-xl px-4 py-4`}

                  type={isShowPassword ? "text" : "password"}
                  id="confirm"
                  name="confirm"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center w-full">
                <img
                priority={true}
                onClick={() => {setIsAgree(!isAgree);}}
                src={isAgree? "/images/checkboxTrue.png" : "/images/checkboxFalse.png"} alt="termsOfService" width={16} height={15}></img>
              <label className="ml-1 text-xs">
                <label className={`${ (focuses[4] || validities[4]|| focuses[4]== null) ? "text-black":"text-red-500"} opacity-30  text-sm`}>I have read and agree to the </label>
                <a to="" className=" text-blue-600  underline opacity-100 cursor-pointer">Terms of Service</a>
              </label>
          </div>

          <div className="w-full h-14 mt-10 mb-3 px-3.5 py-2 bg-black rounded-xl justify-center items-center gap-1 inline-flex cursor-pointer transition duration-200 ease-in hover:shadow-lg hover:bg-black/90  hover:-translate-y-[2px]">
            <div onClick={() => handleSubmit()} className="w-full h-full flex items-center justify-center text-center text-white text-base  font-semibold ">
            Get Started
            </div>
          </div>
          <div className="flex items-center justify-center m-2 ">
            <div className="text-center text-black  font-normal  leading-none mx-1">
            Already have an account?
            </div>
            <Link
                to="/signIn"
              className="text-center text-blue-600 font-semibold mx-1 cursor-pointer"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};



export default SignUpPage;