import React, { Component } from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion"

import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <div className="w-full h-full flex flex-col justify-start items-center "> 
          <label className="text-white text-[150px] mt-[100px] drop-shadow-[0px_0px_8px_#13bbf2] font-semibold">Map App</label>
          <label className="text-white text-3xl my-[50px] font-bold">Let's Get Started</label>
          <div className="flex items center justify-center  font-bold text-xl">
            <Link to="/signIn" className=" px-10 py-2 rounded-full font-bold border-4 transform duration-200 hover:-translate-y-3 hover:scale-105 hover:bg-white text-[#FFFFFF] hover:text-[#13bbf2] border-white mx-10 hover:drop-shadow-[0px_0px_50px_#13bbf2] cursor-pointer">
              Sign In
            </Link>
            <Link to="/signUp" className=" px-10 py-2 text-[#000] bg-[#FFFFFF] rounded-full font-bold border-4 transform duration-200 hover:-translate-y-3 hover:scale-105 hover:bg-transparent hover:text-white border-[#FFFFFF] mx-10 hover:drop-shadow-[0px_0px_50px_#13bbf2] cursor-pointer">
              Sign Up
            </Link>
          </div>
        </div>
    );
  }
}
