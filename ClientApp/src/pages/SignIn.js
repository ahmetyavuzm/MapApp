"use client";
import AuthService from "../services/AuthService";
import React from "react";

import {Link, useNavigate} from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkEmail } from "../services/UtilsService";


const SignInPage = () => {
  
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isRemember, setIsRemember] = React.useState(false);

  const [focus, setFocus] = React.useState(null);
  const [focuses, setFocuses] = React.useState([null, null]);
  const [validities, setValidities] = React.useState([false, false]);

  React.useEffect(() => {
    setValidities([checkEmail(email), password.length > 0]);
  }, [email, password]);

  React.useEffect(() => {
    let temp = [...focuses];
    for (let i = 0; i < temp.length; i++) {
      if (i != focus && temp[i] == true) {
        temp[i] = false;
      }
    }

    temp[focus] = true;
    setFocuses(temp);
    //console.log(focuses);
  }, [focus]);


  const isValidFields = () => {
    return checkEmail(email) && password.length > 0  ? true : false;
  }
  const navigateProfilePage = (uid) =>{
    navigate("/mapApp/"+uid);
  }

  const handleResponse = (loginResponse) => {

    console.log(loginResponse)

    if (!loginResponse.status) {
      if(loginResponse.error.code == AuthService.ERROR_INVALID_CREDENTIAL){
        console.log("Invalid email or password");
        toast.error("Invalid email or password");
        
      }else{
        console.log("An error occured while login");
        toast.error("An error occured while login");
      }
      return;
    }
    navigateProfilePage(AuthService.auth.currentUser.uid);
  };

  const handleLoginWithGoogle = async () => {
    let res = await AuthService.loginGoogle();
    handleResponse(res);
  };

  const handleLoginWithEmailAndPassword = async () => {
    if (!isValidFields()){
      toast.error("Invalid email or password");
      return;
    }

    let res = await AuthService.loginWithEmailAndPassword(email, password);
    handleResponse(res);
  };


  return (
    <section className="flex items-center justify-center w-full py-16 px-2 md:px-0 font-normal text-black text-center rounded-3xl md:rounded-[40px]  bg-white ">
      <div className="flex w-[336px] flex-col items-center justify-center">
        <div
          title="text"
          className="flex flex-col items-center justify-center my-3"
        >
          <p className="text-xl font-semibold m-1">Sign in to your Account </p>
          <p className="text-sm  m-1">
            Welcome back, please enter your details.
          </p>
        </div>
        <div title="login-goggle" className="my-3 w-full">
          <button
            onClick={() => {
              handleLoginWithGoogle();
            }}
            className=" w-full flex items-center justify-around px-10 py-4 border-[1px] border-black rounded-xl transition-colors ease-in duration-200 hover:bg-black hover:text-white"
          >
            <img
              src={"/images/googleIcon.png"}
              alt="google_icon_l"
              width={250}
              height={250}
              className="text-red-500 w-4 h-4"
            />
            <p className="font-semibold">Continue with Google</p>
          </button>
        </div>
        <div className=" w-full h-auto flex items-center justify-center px-3">
          <div className="w-full h-[1px] bg-black opacity-25"></div>
          <p className="mx-4 opacity-25 text-[14px]">OR</p>
          <div className="w-full h-[1px] bg-black opacity-25"></div>
        </div>
        <form className=" w-full text-sm  text-start">
          <div className="my-4  w-full">
            <div className="w-full h-full">
              <label
                className={`${
                  focuses[0] || validities[0] || focuses[0] == null
                    ? "text-black"
                    : " text-red-500"
                } opacity-75`}
              >
                Email Adress
              </label>
              <input
                value={email}
                onFocus={() => setFocus(0)}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                className={`${
                  focuses[0] || validities[0] || focuses[0] == null
                    ? "text-black border-black outline-black"
                    : " text-red-500 border-red-500 shadow-red-500 shadow-sm"
                } w-full border-[1px] rounded-xl px-4 py-4 `}
                type="text"
                id="email"
                name="email"
              />
            </div>
          </div>
          <div className="my-4 w-full">
            <div className=" w-full h-full ">
              <label
                className={`${
                  focuses[1] || validities[1] || focuses[1] == null
                    ? "text-black"
                    : " text-red-500"
                } opacity-75`}
              >
                Password
              </label>
              <div className="w-full flex items-center relative">
                <img
                  src={
                    isShowPassword
                      ? "/images/unEyeIcon.png"
                      : "/images/eyeIcon.png"
                  }
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
                  onFocus={() => setFocus(1)}
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                  className={`${
                    focuses[1] || validities[1] || focuses[1] == null
                      ? "text-black border-black outline-black"
                      : " text-red-500 border-red-500 shadow-red-500 shadow-sm"
                  } w-full border-[1px] rounded-xl px-4 py-4 `}
                  type={isShowPassword ? "text" : "password"}
                  id="password"
                  name="password"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center justify-center">
              <img
                onClick={() => {
                  setIsRemember(!isRemember);
                }}
                src={
                  isRemember
                    ? "/images/checkboxTrue.png"
                    : "/images/checkboxFalse.png"
                }
                alt="remember"
                width={16}
                height={15}
              ></img>
              <label className="text-opacity-30 ml-1">Remember Me</label>
            </div>

            <Link to="./forgot" className=" text-black font-semibold">
              Forgot Password?
            </Link>
          </div>

          <div className="w-full h-14 mb-3 mt-10 px-3.5 py-2 bg-black rounded-xl justify-center items-center gap-1 inline-flex cursor-pointer transition duration-200 ease-in hover:shadow-lg hover:bg-black/90  hover:-translate-y-[2px]">
            <div
              onClick={() => handleLoginWithEmailAndPassword()}
              className="w-full h-full flex items-center justify-center text-center text-white text-base font-semibold "
            >
              Sign In
            </div>
          </div>
          <div className="flex items-center justify-center m-2 text-sm ">
            <div className="text-center text-black font-normal  leading-none mx-1">
              Don’t have an account?
            </div>
            <Link
              to="/signup"
              className="text-center text-blue-600 font-semibold mx-1 cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignInPage;
